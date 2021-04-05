import React, { useState, useEffect } from 'react'
import axios from 'axios';
import YouTube from 'react-youtube';
import CarouselSlide from './CarouselSlide';
export default function Row(props) {
    //const url = `https://www.youtube.com/embed/${videoId}`;
    const opts = {
        height: '470px',
        width: '100%',
    }
    //const [trailer, setTrailer] = useState('')
    const YOUTUBE_API_KEY = 'AIzaSyA-UbRUXMBJCmt4pw3ZRSOPCZVTExRcvDw'
    const youtubeEndpoint = 'https://www.googleapis.com/youtube/v3/search'
    const endpoint = 'https://api.themoviedb.org/3'
    const [trailerId, setTrailerId] = useState('')
    const [movieDetails, setMovieDetails] = useState('')
    const [showDetails, setShowDetails] = useState(false)
    let youtubeId = ''
    const getTrailer = async (movie) => {

        const response = await axios.get(`${youtubeEndpoint}?part=snippet&&key=${YOUTUBE_API_KEY}&type=video&q=${movie.name ? movie.name : movie.original_title} trailer`)
        console.log(response.data.items);
        setTrailerId(response.data.items[0].id.videoId)
        //console.log(trailer);
    }
    const showTrailer = async (movie, movieOrSeries) => {
        let trailerurl = await axios.get(
            `${endpoint}/${movieOrSeries}/${movie.id}/videos?api_key=a3d71a761a7bb30717e08b95a73a97c4`
        );
        console.log(trailerurl.data.results);
        if (trailerurl.data.results.length > 0)
            youtubeId = trailerurl.data.results[0].key
        console.log(youtubeId);
        //setTrailerId('2TR0gaG01do')
        setTrailerId(youtubeId)
    }
    const getDetailsById = async (id, movieOrSeries) => {
        let details = await axios.get(`${endpoint}/${movieOrSeries}/${id}?api_key=a3d71a761a7bb30717e08b95a73a97c4`);
        console.log(details.data);
        //console.log(details.data.release_date.slice(0,4));

        setMovieDetails(details.data);
    }
    const showTrailerAndGetDetails = async (movie, movieOrSeries) => {
        showTrailer(movie, movieOrSeries);
        getDetailsById(movie.id, movieOrSeries);
        handleShowDetails();
    }
    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }
    return (
        <div >
            <h2>{props.title}</h2>
            <div className="moviePosterRow" >
                {
                    props.data.map(movie => {
                        return <div key={movie.id}>
                            <img
                                className={`moviePoster ${props.isOriginal ? 'bigMoviePoster' : ''}`}
                                onClick={() => showTrailerAndGetDetails(movie, props.isMovieOrTV)}
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
                    (showDetails && trailerId) ? <div className={`${trailerId ? 'openDetailsBackground' : ''}`}>
                        <div className='openDetails' >
                            <div className="closeDetails" onClick={handleShowDetails}>×</div>
                            <div className="shadow"></div>
                            <div className="trailer">
                                {

                                    (showDetails && trailerId) ? <YouTube videoId={trailerId} opts={opts} /> : null

                                    // (showDetails && trailerId) ? <iframe src={`http://www.youtube.com/embed/${trailerId}`}
                                    //     width="100%" height="470" frameborder="0" allowfullscreen></iframe> :
                                    //     null

                                }
                            </div>
                            <div className="details">
                                <div className="detailsLeft">
                                    <h2 className="detailsHeader">
                                        <span className="score">average score: {movieDetails.vote_average}</span> &nbsp;
                                        {props.isMovieOrTV === 'movie' ? movieDetails.release_date.slice(0, 4) : movieDetails.last_air_date.slice(0, 4)} &nbsp;
                                         {props.isMovieOrTV === 'tv' ? `${movieDetails.number_of_seasons} seasons` : ''}
                                        {props.isMovieOrTV === 'movie' ? `${Math.floor(movieDetails.runtime / 60)}h ${Math.floor(movieDetails.runtime % 60)}m` : ''}
                                         &nbsp;<button class="addToList">+</button>
                                    </h2>

                                    <span className="movieDetailsOverview">
                                        {movieDetails.overview}
                                    </span>
                                </div>
                                <div className="detailsRight">

                                </div>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        </div>
    )
}
