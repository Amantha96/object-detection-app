import React, { useState, useRef } from 'react';
import './middlebox.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import { imageDB } from '../../firebase/config';
import CircularProgress from '@mui/material/CircularProgress';

function MiddleBox() {
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [buttonText, setButtonText] = useState("UPLOAD");

    // State to toggle whether the yellowbox image is displayed
    const [isYellowboxImageDisplayed, setIsYellowboxImageDisplayed] = useState(false);

    const handleUpload = () => {
        if (img) {
            setIsLoading(true);
            const imgRef = ref(imageDB, `files/${v4()}`);
            uploadBytes(imgRef, img)
                .then(() => {
                    alert('Image uploaded successfully');
                    setImg(null);
                    setButtonText("TRACK");
                    setIsYellowboxImageDisplayed(false); // Reset the yellowbox image display
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                    setIsLoading(false);
                });
        } else {
            console.error('No image selected for upload');
        }
    }


    const handleFileChange = (event) => {
        const selectedImage = event.target.files[0];
        setImg(selectedImage);

        if (selectedImage) {
            const yellowbox = document.querySelector('.yellowbox');
            yellowbox.style.backgroundImage = `url(${URL.createObjectURL(selectedImage)}`;
            yellowbox.style.backgroundSize = 'cover';
            setIsYellowboxImageDisplayed(true); // Set the yellowbox image display to true
        }
    }

    const openFileInput = () => {
        fileInputRef.current.click();
    }

    // Function to reset the yellowbox image
    const resetYellowbox = () => {
        const yellowbox = document.querySelector('.yellowbox');
        yellowbox.style.backgroundImage = 'none';
        setIsYellowboxImageDisplayed(false); // Reset the yellowbox image display
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