import axios from 'axios'
import React, { useEffect, useState } from 'react'
//import MovieRow from './MovieRow'
import Row from './Row'

export default function Main() {
    const API_KEY = 'a3d71a761a7bb30717e08b95a73a97c4'
    const endpoint = 'https://api.themoviedb.org/3'
    const imgEndpoint = 'http://image.tmdb.org/t/p/original'
    const [originals, setOriginals] = useState([])
    const [trending, setTrending] = useState([])
    useEffect(() => {
        const getOriginals = async () => {
            const response = await axios.get(`${endpoint}/discover/tv?api_key=${API_KEY}&with_networks=213`)
            console.log(response.data.results);
            setOriginals(response.data.results)
        }
        const getTrending = async () => {
            const response = await axios.get(`${endpoint}/trending/all/week?api_key=${API_KEY}&language=en-US`)
            console.log(response.data.results);
            setTrending(response.data.results)

        }
        getOriginals()
        getTrending()
    }, [])
    return (
        <>
            {

                <div>
                    <Row title={'NETFLIX ORIGINAlS'} isOriginal={true} data={originals} imgEndpoint={imgEndpoint} />
                    <Row title={'TRENDING ON NETFLIX'} data={trending} imgEndpoint={imgEndpoint} />
                </div>
            }
        </>

    )
}
