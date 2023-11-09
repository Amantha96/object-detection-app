import React, { useState, useRef } from 'react';
import './middlebox.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import { imageDB } from '../../firebase/config';

function MiddleBox() {
    const [img, setImg] = useState(null);
    const fileInputRef = useRef(null);

    const handleUpload = () => {
        if (img) {
            const imgRef = ref(imageDB, `files/${v4()}`);
            uploadBytes(imgRef, img)
                .then(() => {
                    console.log('Image uploaded successfully.');
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        } else {
            console.error('No image selected for upload.');
        }
    }

    const handleFileChange = (event) => {
        setImg(event.target.files[0]);
    }

    const openFileInput = () => {
        fileInputRef.current.click();
    }

    return (
        <div className="container">
            <div className="middlebox">
                <div className="text">
                    <h1>Your photos</h1>
                    <p>Take photos or add existing ones from the gallery</p>
                </div>
                <div className="yellowbox" onClick={openFileInput}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <AddAPhotoIcon style={{
                        fontSize: '70px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} />
                </div>
                <button onClick={handleUpload} className="uploadbtn">UPLOAD</button>
            </div>
        </div>
    );
}

export default MiddleBox;
