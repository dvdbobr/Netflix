import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Row from './Row'

export default function Search(props) {
    const endpoint = 'https://api.themoviedb.org/3'
    const imgEndpoint = 'http://image.tmdb.org/t/p/original'
    const [searchList, setSearchList] = useState([])
    useEffect(() => {
        const searchMovie = async () => {
            const response = await axios.get(`${endpoint}/search/movie?api_key=a3d71a761a7bb30717e08b95a73a97c4&query=${props.match.params.term}`)
            console.log(response.data.results);
            setSearchList(response.data.results)
        }
        searchMovie()
    }, [])
    return (
        <div>
            <Navbar />
            <div className="searchMovies">
                <Row title={`MOVIES RELATED TO ${(props.match.params.term).toUpperCase()}`}
                    isMovieOrTV={'movie'}
                    data={searchList}
                    imgEndpoint={imgEndpoint} />
            </div>
        </div>
    )
}
