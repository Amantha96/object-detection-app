import React, { useState, useRef, useEffect } from 'react';
import './middlebox.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import { imageDB } from '../../firebase/config';
import CircularProgress from '@mui/material/CircularProgress';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

function MiddleBox() {
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [buttonText, setButtonText] = useState("UPLOAD");
    const [model, setModel] = useState(null);

    // State to toggle whether the yellowbox image is displayed
    const [isYellowboxImageDisplayed, setIsYellowboxImageDisplayed] = useState(false);

    const handleUpload = async () => {
        if (img) {
            setIsLoading(true);
            const imgRef = ref(imageDB, `files/${v4()}`);
            try {
                await uploadBytes(imgRef, img);
                alert('Image uploaded successfully');
                setImg(null);
                setButtonText("TRACK");
                setIsYellowboxImageDisplayed(false);
                setIsLoading(false);

                if (model) {
                    // Perform object detection and render bounding boxes
                    await performObjectDetection(img);
                } else {
                    console.error('Model is not loaded.');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                setIsLoading(false);
            }
        } else {
            console.error('No image selected for upload');
        }
    };

    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await cocossd.load();
                setModel(loadedModel);
            } catch (error) {
                console.error('Error loading the model:', error);
            }
        };
        loadModel();
    }, []);

    const handleFileChange = (event) => {
        const selectedImage = event.target.files[0];
        setImg(selectedImage);

        if (selectedImage) {
            const yellowbox = document.querySelector('.yellowbox');
            yellowbox.style.backgroundImage = `url(${URL.createObjectURL(selectedImage)}`;
            yellowbox.style.backgroundSize = 'cover';
            setIsYellowboxImageDisplayed(true);
        }
    }

    const openFileInput = () => {
        fileInputRef.current.click();
    }

    const resetYellowbox = () => {
        const yellowbox = document.querySelector('.yellowbox');
        yellowbox.style.backgroundImage = 'none';
        setIsYellowboxImageDisplayed(false);
    }

    // Function to perform object detection and render bounding boxes
    const performObjectDetection = async (image) => {
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(image);
        await imageElement.decode();

        const predictions = await model.detect(imageElement);
        renderBoundingBoxes(predictions);
    }

    // Function to render bounding boxes
    const renderBoundingBoxes = (predictions) => {
        const yellowbox = document.querySelector('.yellowbox');
        const imageElement = document.createElement('img');
        imageElement.src = yellowbox.style.backgroundImage.replace(/url\(['"]?([^'"]*)['"]?\)/g, '$1');
        const scaleFactorX = imageElement.width / yellowbox.offsetWidth;
        const scaleFactorY = imageElement.height / yellowbox.offsetHeight;

        // Create a canvas on top of the image
        const canvas = document.createElement('canvas');
        canvas.width = yellowbox.offsetWidth;
        canvas.height = yellowbox.offsetHeight;
        yellowbox.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        predictions.forEach((prediction) => {
            const bbox = prediction.bbox;
            ctx.strokeStyle = 'red'; // Box color
            ctx.lineWidth = 2;
            ctx.strokeRect(bbox[0] * scaleFactorX, bbox[1] * scaleFactorY, bbox[2] * scaleFactorX, bbox[3] * scaleFactorY);
        });
    }

    return (
        <div className="container">
            <div className="middlebox">
                <div className="text">
                    <h1>Your photos</h1>
                    <p>Take photos or add existing ones from the gallery</p>
                </div>
                <div className="yellowbox" onClick={isYellowboxImageDisplayed ? resetYellowbox : openFileInput}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {isLoading ? (
                        <div className="loading-indicator">
                            <CircularProgress style={{ color: 'black' }} />
                        </div>
                    ) : (
                        (buttonText !== "TRACK" && !img) ? (
                            <AddAPhotoIcon style={{
                                fontSize: '70px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} />
                        ) : null
                    )}
                </div>

                <button onClick={handleUpload} className="uploadbtn">{buttonText}</button>
            </div>
        </div>
    );
}

export default MiddleBox;
