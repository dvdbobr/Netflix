import React, { useState } from 'react'
import axios from 'axios';
import YouTube from 'react-youtube';
export default function Row(props) {
    //const url = `https://www.youtube.com/embed/${videoId}`;
    const opts = {
        height: '500px',
        width: '500px',
    }
    //const [trailer, setTrailer] = useState('')
    const YOUTUBE_API_KEY = 'AIzaSyA-UbRUXMBJCmt4pw3ZRSOPCZVTExRcvDw'
    const youtubeEndpoint = 'https://www.googleapis.com/youtube/v3/search'
    const [trailerId, setTrailerId] = useState('')
    const getTrailer = async (movie) => {
        
        const response = await axios.get(`${youtubeEndpoint}?part=snippet&&key=${YOUTUBE_API_KEY}&type=video&q=${movie.name?movie.name:movie.original_title} trailer`)
        console.log(response.data.items);
        setTrailerId(response.data.items[0].id.videoId)
        //console.log(trailer);
    }
    // const showTrailer = async (movie) => {
    //     console.log("work");

    //     let trailerurl = await axios.get(
    //         `https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=a3d71a761a7bb30717e08b95a73a97c4`
    //     );
    //     console.log(trailerurl.data.results);
    //     //setTrailerId('2TR0gaG01do')


    // }
    return (
        <div >
            <h2>{props.title}</h2>
            <div className="moviePosterRow" style={{ position: 'relative' }}>
                {
                    props.data.map(movie => {
                        return <div key={movie.id}>
                            <img
                                className={`moviePoster ${props.isOriginal ? 'bigMoviePoster' : ''}`}
                                onClick={() => getTrailer(movie)}
                                src={
                                    props.isOriginal ? props.imgEndpoint + movie.poster_path :
                                        props.imgEndpoint + movie.backdrop_path
                                }
                                alt="poster"
                            />

                        </div>
                    })
                }
                {
                    <div style={{ width: 500, height: 500, position: 'absolute', top: 300 }}>
                        {/* <iframe src="http://www.youtube.com/embed/2TR0gaG01do"
                            width="560" height="315" frameborder="0" allowfullscreen></iframe> */}
                        {trailerId ? <YouTube videoId={trailerId} opts={opts} /> : null}
                    </div>
                }
            </div>
        </div>
    )
}
