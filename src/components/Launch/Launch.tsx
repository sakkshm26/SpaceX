import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Launch.css";

const Launch = () => {

    const { id } = useParams();

    const [launch, setLaunch] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.spacexdata.com/v5/launches/${id}`).then(res => setLaunch(res.data));
    }, []);

    useEffect(() => {
        if (Object.keys(launch).length !== 0) {
            setLoading(false);
            console.log(launch);
        }
    }, [launch]);

    return (
        <div className='launch'>
            <Typography textAlign="center" margin="30px 0" fontWeight="bold" fontSize="20px" color="white">Launch Details</Typography>
            {loading ? <div className="loader">Loading...</div> :
                <div className='info'>
                    <h4>Name: {launch.name}</h4>
                    <p>Details: {launch.details ? launch.details : "Not available"}</p>
                    <p>Launch Date: {launch.date_local.slice(0,10)}</p>
                    <p>Reused: {launch.fairings ? `${launch.fairings.reused}`.toUpperCase() : "Not available"}</p>
                </div>
            }
        </div>
    )
}

export default Launch
