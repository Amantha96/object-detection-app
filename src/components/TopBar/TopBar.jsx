import React from 'react'
import banner from '../images/banner.png';
import './topbar.css';
import { Grid } from '@mui/material';


function TopBar() {

    return (
        <Grid className="container">

            <Grid className="topBar">

                <Grid className="promiseQ">
                    <img src={banner} height="60px" />
                </Grid>

            </Grid>

        </Grid>

    )
}

export default TopBar