import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
export default function Movies() {
    const API_KEY = 'a3d71a761a7bb30717e08b95a73a97c4'

    const endpoint = 'https://api.themoviedb.org/3'
    const imgEndpoint = 'http://image.tmdb.org/t/p/original'
    const [list, setlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [term, setTerm] = useState('')
    useEffect(() => {
        const getList = async () => {
            const response = await axios.get(`${endpoint}/search/movie?api_key=${API_KEY}&query=joaquin`)
            console.log(response.data.results);
            setlist(response.data.results)
            setLoading(false)
        }
        getList();
        console.log(term);
    }, [])
    return (
        <div>
            <Navbar setTerm={setTerm}/>
            {list.map(item => {
                return <div >
                    <div>{item.name ? item.name : item.title}</div>
                </div>
            })}
        </div>
    )
}
