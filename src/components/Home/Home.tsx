import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Home.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const renderNoLaunch = () => {
        return (
            <span> No launches available</span>
        )
    }

    useEffect(() => {
        axios.get("https://api.spacexdata.com/v4/launchpads").then(res => setList(res.data));
        // console.log(res.data);
    }, [])

    useEffect(() => {
        if(list.length) {
            setLoading(false);
            // console.log(list);
        }
    }, [list])

    return (
        <div className='home'>
            {loading ? <div className="loader">Loading...</div> 
            : 
            <div>
            <Typography textAlign="center" margin="30px 0" fontSize="20px" color="white">List of Launchpads 🚀</Typography>
            <Box className='launchpads'>
                {list.map(element => <Card key={element.id} sx={{ maxWidth: 345, backgroundColor: "black" }} className="card">
                    <CardContent>
                        <Typography gutterBottom fontSize="18px" component="div" color="white">
                            {element.full_name}
                        </Typography>
                        <Typography variant="body2" color="white" margin="12px 0">
                            {element.details.slice(0,85)}...
                        </Typography>
                        <Typography gutterBottom fontSize="17px" variant="body2" component="div" color="white" margin="10px 0">
                            Status: <Typography component="span" variant="span" fontWeight="bold">{element.status.toUpperCase()}</Typography>
                        </Typography>
                        <Typography variant="body2" component="h5" color="white">
                        <Typography component="span" variant="span" fontSize="15px">Launches:</Typography> 
                            {element.launches.length ? element.launches.slice(0,3).map(launch => <NavLink className='launch-link' key={launch} to={`/launch/${launch}`}><Typography className="link1" margin="3px 0" color="white" variant='p' component="p">{launch}</Typography></NavLink>)
                            :
                            renderNoLaunch()}
                        </Typography>
                    </CardContent>
                </Card>)}
            </Box>
            </div>
            }
        </div>
    )
}

export default Home
