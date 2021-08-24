import React, { useState, useEffect } from 'react'
import axios from 'axios';
import YouTube from 'react-youtube';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { addMovieToLocal, inMyList } from '../localStorage.jsx'
export default function Row(props) {
    const opts = {
        height: '400px',
        width: '100%',
    }
    const settings = {
        dots: true,
        infinite: props.data.length > 6,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            >
                <FaChevronRight size={50} color={'white'} />
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            >
                <FaChevronLeft size={50} color={'white'} />
            </div>
        );
    }

    const endpoint = 'https://api.themoviedb.org/3';
    const imgEndpoint = "https://image.tmdb.org/t/p/original";
    const [trailerId, setTrailerId] = useState('');
    const [movieDetails, setMovieDetails] = useState('');
    const [castDetails, setCastDetails] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading]= useState(false);

    const showTrailer = async (movie, movieOrSeries) => {
        try{
            let trailerurl = await axios.get(`${endpoint}/${movieOrSeries}/${movie.id}/videos?api_key=a3d71a761a7bb30717e08b95a73a97c4`);
            if (trailerurl.data.results.length > 0){
                trailerurl.data.results.forEach(trailer => {
                    if(trailer.type==='Trailer'){}
                    setTrailerId(trailer.key);
                });
            }
            else{
                setTrailerId('')
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const getDetailsById = async (id, movieOrSeries) => {
        try{
            let details = await axios.get(`${endpoint}/${movieOrSeries}/${id}?api_key=a3d71a761a7bb30717e08b95a73a97c4`);
            let cast = await axios.get(`${endpoint}/${movieOrSeries}/${id}/credits?api_key=a3d71a761a7bb30717e08b95a73a97c4`)
            setMovieDetails(details.data);
            setCastDetails(cast.data.cast.slice(0, 4));
            setLoading(true);
        }
        catch (err) {console.log(err)}
    }
    const showTrailerAndGetDetails = async (movie, movieOrSeries) => {
        showTrailer(movie, movieOrSeries).then(
            getDetailsById(movie.id, movieOrSeries).then(
                handleShowDetails()
            )
        )
        console.log(movieDetails);
    }
    const handleShowDetails = () => {
        setLoading(false);

        if(trailerId.length>0||Object.keys(movieDetails).length>0)
            setShowDetails(!showDetails);
        if(showDetails===false){
            setTrailerId('');
            setMovieDetails('');
            setCastDetails('');
        }
    }
    const checkIfExsistsInStorage = () => {
        if (!inMyList('user1', movieDetails.id)) 
            addMovieToLocal('user1', props.isMovieOrTV, movieDetails)
    }


    return (
        <div className="searchMovies">
            <h2>{props.title}</h2>
            <div className="moviePosterRow" >
                {//carousel = do i want a carousel
                    props.carousel ? <div>
                        {props.data.length>0&&<Slider {...settings}>
                            {//mylist = is it mylist row
                                !props.mylist ? props.data.map(movie => {
                                    return <div key={movie.id}>
                                        <img
                                            className={`moviePoster ${props.isOriginal ? 'bigMoviePoster' : ''}`}
                                            onClick={() => showTrailerAndGetDetails(movie, props.isMovieOrTV)}//is movie or tv for the api request
                                            src={
                                                props.isOriginal ? props.imgEndpoint + movie.poster_path ://is netflix original than big poster
                                                    props.imgEndpoint + movie.backdrop_path
                                            }
                                            alt="poster"
                                        />
                                    </div>
                                }) ://not mylist row
                                    props.data.map(movie => {
                                        return <div key={movie.details.id}>
                                            <img
                                                className={`moviePoster`}
                                                onClick={() => showTrailerAndGetDetails(movie.details, movie.type)}
                                                src={
                                                    props.imgEndpoint + movie.details.backdrop_path
                                                }
                                                alt="poster"
                                            />
                                        </div>
                                    })
                            }
                        </Slider>}
                    </div> : (//no carousel for movies and tv series page and for search page 
                        <div className="moviesGrid">
                            {
                                !props.mylist ? props.data.map(movie => {
                                    return movie.backdrop_path ? <div key={movie.id}>
                                        <img
                                            className={`moviePoster`}
                                            onClick={() => showTrailerAndGetDetails(movie, props.isMovieOrTV)}
                                            src={
                                                props.isOriginal ? props.imgEndpoint + movie.poster_path :
                                                    props.imgEndpoint + movie.backdrop_path
                                            }
                                            alt="poster"
                                        />
                                    </div> : null
                                }) ://not mylist row
                                    props.data.map(movie => {
                                        return <div key={movie.details.id}>
                                            <img
                                                className={`moviePoster`}
                                                onClick={() => showTrailerAndGetDetails(movie.details, movie.type)}
                                                src={
                                                    props.imgEndpoint + movie.details.backdrop_path
                                                }
                                                alt="poster"
                                            />
                                        </div>
                                    })
                            }
                        </div>
                    )
                }

                {
                loading??
                //show details = clicked on movie/tv series trailerId exsists only after a movie or series was clicked
                    (showDetails) ? <div className='openDetailsBackground'>
                        <div className='openDetails' >
                            <div className="closeDetails" onClick={handleShowDetails}>×</div>
                            {/* <div className="shadow"></div> */}
                            
                            <div className="trailer">
                                {
                                    trailerId.length>0?<YouTube videoId={trailerId} opts={opts} /> :
                               
                                        <img
                                                className={`noTrailerPoster`}
                                                src={
                                                        imgEndpoint + movieDetails.backdrop_path
                                                    }
                                                alt="poster"
                                            />

                                    // (showDetails && trailerId) ? <iframe src={`http://www.youtube.com/embed/${trailerId}`}
                                    //     width="100%" height="470" frameborder="0" allowfullscreen></iframe> :
                                    //     null

                                }
                            </div>
                            
                            
                            <div className="details">
                                <div className="detailsLeft">
                                    <h2 className="detailsHeader">
                                        {/* {props.isMovieOrTV === 'movie' ? movieDetails.release_date.slice(0, 4) : movieDetails.last_air_date.slice(0, 4)} &nbsp; */}
                                        {props.isMovieOrTV === 'tv' ? `${movieDetails.name} ${movieDetails.number_of_seasons} seasons -` : ''}
                                        {props.isMovieOrTV === 'movie' ? `${movieDetails.title} ${Math.floor(movieDetails.runtime / 60)}h ${Math.floor(movieDetails.runtime % 60)}m -` : ''}
                                        <span className="score"> Average Score: {movieDetails.vote_average} </span>
                                    </h2>

                                    <div className="movieDetailsOverview">
                                        {movieDetails.overview}
                                    </div><br />
                                    <button onClick={() => checkIfExsistsInStorage()} class="addToList">+</button>

                                </div>
                                <div className="detailsRight">
                                    <span className="grayCast">cast:</span>
                                    {castDetails && castDetails.map(p => {
                                        return <span className="castName"> {p.original_name},&nbsp;</span>
                                    })}<br /><br />
                                    <span className="grayCast">genres:</span>
                                    {movieDetails && movieDetails.genres.map(g => {
                                        return <span className="castName">{g.name},&nbsp;</span>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        </div>
    )
}
