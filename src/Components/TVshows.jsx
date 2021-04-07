import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Row from './Row'
export default function TVshows() {
    const API_KEY = 'a3d71a761a7bb30717e08b95a73a97c4'

    const endpoint = 'https://api.themoviedb.org/3'
    const imgEndpoint = 'https://image.tmdb.org/t/p/original'
    const [popularTV, setPopularTV] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getPopularTV = async () => {
            const response = await axios.get(`${endpoint}/tv/popular?api_key=${API_KEY}&language=en-US&page=2`)
            setPopularTV(response.data.results)
            setLoading(false)
        }
        getPopularTV();
    }, [])
    return (
        <div>
            
             <Navbar/>
            {loading?<div className="nfLoader"></div>
            :<div className="searchMovies">
                <Row title={`POPULAR TV SERIES`}
                    isMovieOrTV={'tv'}
                    data={popularTV}
                    imgEndpoint={imgEndpoint} />
            </div>}
        </div>
    )
}
