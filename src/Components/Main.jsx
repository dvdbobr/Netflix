import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Billboard from './Billboard'
import Navbar from './Navbar'
import { inisializeLocal,addMovieToLocal,getUserData } from '../localStorage.jsx'
import Row from './Row'

export default function Main() {
    const API_KEY = 'a3d71a761a7bb30717e08b95a73a97c4'
    const [userData] = useState(getUserData('user1'))
    const endpoint = 'https://api.themoviedb.org/3'
    const imgEndpoint = 'http://image.tmdb.org/t/p/original'
    const [originals, setOriginals] = useState([])
    const [trending, setTrending] = useState([])
    const [crime, setCrime] = useState([])
    let [addedToList, setAddedToList] = useState(0)

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getOriginals = async () => {
            const response = await axios.get(`${endpoint}/discover/tv?api_key=${API_KEY}&with_networks=213`)
            console.log(response.data.results);
            setOriginals(response.data.results)
            setLoading(false)
        }
        const getTrending = async () => {
            const response = await axios.get(`${endpoint}/trending/all/week?api_key=${API_KEY}&language=en-US`)
            console.log(response.data.results);
            setTrending(response.data.results)
        }
        const getCrime = async ()=>{
            const response = await axios.get(`${endpoint}/discover/movie?api_key=${API_KEY}&with_genres=80`)
            console.log(response.data.results);
            setCrime(response.data.results)
        }
        getOriginals()
        getCrime()
        getTrending()
    }, [addedToList])
    return (
        <>
            <Navbar />
            {
                <div>
                    {loading ? null : <Billboard originals={originals} imgEndpoint={imgEndpoint}/>}
                    {/* <Row title={'My List'} data={userData} carousel={true} imgEndpoint={imgEndpoint} mylist={true} addedToList={addedToList} setAddedToList={setAddedToList}/> */}
                    <Row title={'NETFLIX ORIGINALS'} isMovieOrTV={'tv'} isOriginal={true} carousel={true} data={originals} imgEndpoint={imgEndpoint} addedToList={addedToList} setAddedToList={setAddedToList}/>
                    <Row title={'TRENDING ON NETFLIX'} isMovieOrTV={'movie'} data={trending} carousel={true} imgEndpoint={imgEndpoint} addedToList={addedToList} setAddedToList={setAddedToList}/>
                    <Row title={'CRIME'} isMovieOrTV={'movie'} carousel={true} data={crime} imgEndpoint={imgEndpoint} addedToList={addedToList} setAddedToList={setAddedToList}/>
                </div>
                
            }
        </>

    )
}
