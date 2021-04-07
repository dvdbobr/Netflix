import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Row from './Row'
export default function Movies() {
    const API_KEY = 'a3d71a761a7bb30717e08b95a73a97c4'

    const endpoint = 'https://api.themoviedb.org/3'
    const imgEndpoint = 'http://image.tmdb.org/t/p/original'
    const [loading, setLoading] = useState(true)
    const [popularMovies, setPopularMovies] = useState('')
    useEffect(() => {
        const getPopularMovies = async () => {
            const response = await axios.get(`${endpoint}/movie/popular?api_key=${API_KEY}&language=en-US&page=2`)
            console.log(response.data.results);
            setPopularMovies(response.data.results)
            setLoading(false)
        }
        getPopularMovies();
    }, [])
    return (
        <div>
            <Navbar/>
            {loading?<div className="nfLoader"></div>
            :<div className="searchMovies">
                <Row title={`POPULAR MOVIES`}
                    isMovieOrTV={'movie'}
                    data={popularMovies}
                    imgEndpoint={imgEndpoint} />
            </div>}
        </div>
    )
}
