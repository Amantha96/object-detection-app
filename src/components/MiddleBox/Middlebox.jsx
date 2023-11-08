import React from 'react'
import './middlebox.css';
import { Grid, Typography } from '@mui/material';


function MiddleBox() {
    // 

    return (
        <Grid className="container">
            <Grid xs={12} className="middlebox">
                <Grid xs={12} className="text">
                    <h1>Your Photos</h1>
                    <p>Take photos or add existing ones from the gallery</p>
                </Grid>
                <Grid className="yellowbox">

                </Grid>
            </Grid>

        </Grid>

    )
}

export default MiddleBox