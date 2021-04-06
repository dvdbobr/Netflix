import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Row from './Row'

export default function Search(props) {
    const endpoint = 'https://api.themoviedb.org/3'
    const imgEndpoint = 'http://image.tmdb.org/t/p/original'
    const [searchMovies, setMovies] = useState([])
    const [searchSeries, setSearchSeries] = useState([])
    useEffect(() => {
        const searchMovie = async () => {
            const movies = await axios.get(`${endpoint}/search/movie?api_key=a3d71a761a7bb30717e08b95a73a97c4&query=${props.match.params.term}`)
            const series = await axios.get(`${endpoint}/search/tv?api_key=a3d71a761a7bb30717e08b95a73a97c4&query=${props.match.params.term}`)

            console.log(series.data.results);
            setSearchSeries(series.data.results)
            setMovies(movies.data.results)
        }
        searchMovie()
    }, [props.match.params.term])
    return (
        <div>
            <Navbar />
            <div className="searchMovies">
                <Row title={`MOVIES RELATED TO ${(props.match.params.term).toUpperCase()}`}
                    isMovieOrTV={'movie'}
                    data={searchMovies}
                    imgEndpoint={imgEndpoint} />
                <Row title={`TV SHOWS RELATED TO ${(props.match.params.term).toUpperCase()}`}
                    isMovieOrTV={'tv'}
                    data={searchSeries}
                    imgEndpoint={imgEndpoint} />
            </div>
        </div>
    )
}
