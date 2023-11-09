import React from 'react'
import banner from '../images/banner.png';
import './topbar.css';



function TopBar() {
    return (
        <div className="container">
            <div className="topBar">
                <div className="promiseQ">
                    <img src={banner} height="60px" />
                </div>
            </div>
        </div>
    );
}


export default TopBar