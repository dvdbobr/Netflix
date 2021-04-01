import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Main() {
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/movie/76341?api_key=a3d71a761a7bb30717e08b95a73a97c4')
            console.log(response.data);
           setData(response.data)
        }
        getData()
    }, [])
    return (
        <div>
            {data.original_title}
        </div>
    )
}
