import React from 'react'
import { Card, makeStyles } from '@material-ui/core';
export default function CarouselSlide(props) {
    const { backgroundColor, src } = props.content;
    const useStyles = makeStyles(() => ({
        card: {
            backgroundColor,
            borderRadius: 5,
            padding: '75px 50px',
            margin: '0px 25px',
            width: '500px',
            boxShadow: '20px 20px 20px black',
            display: 'flex',
            justifyContent: 'center',
        } 
    }));
    const classes = useStyles();
    return (
        <Card className="moviePoster">
            <img className={classes} src={src} alt=""/>
        </Card>
    )
}
