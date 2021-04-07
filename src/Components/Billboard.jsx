import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { GrPlayFill } from 'react-icons/gr'
import { BiInfoCircle } from 'react-icons/bi'
export default function Billboard(props) {
    const [movieIndex]= useState(props.originals[Math.floor(Math.random() * props.originals.length)])
    const endpoint = 'https://api.themoviedb.org/3'
    const [trailerId, setTrailerId] = useState('')
    let youtubeId = ''
    const showTrailer = async (movie) => {
        let trailerurl = await axios.get(`${endpoint}/tv/${movie.id}/videos?api_key=a3d71a761a7bb30717e08b95a73a97c4`);
        console.log(trailerurl.data.results);
        if (trailerurl.data.results.length > 0)
            youtubeId = trailerurl.data.results[0].key
        console.log(youtubeId);
        setTrailerId(youtubeId)
    }
    console.log(movieIndex);
    useEffect(() => {
        showTrailer(movieIndex)
        console.log(movieIndex.id);
    }, [movieIndex])
    return (
        <div className="billboard"
            style={{
                background: `url(${props.imgEndpoint + movieIndex.backdrop_path}) no-repeat center center / cover`,

            }}
        >
            <div className="billboardDetails">
                <div className="shadow"></div>
                <h1>{movieIndex.name}</h1>
                <div className="billboardDescription">
                    <p>{movieIndex.overview}</p>
                </div>
                <div className="billboardButtons">
                    <button className="billBoardPlay"><a style={{color: 'black'}} href={`https://www.youtube.com/watch?v=${trailerId}`} target="blank"><GrPlayFill /> Play</a></button>
                    <button className="billBoardInfo"><BiInfoCircle size={34} /> More Info</button>
                </div>
            </div>
        </div>
    )
}
