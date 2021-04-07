import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Row from './Row'
import { getUserData } from '../localStorage'
export default function MyList() {
    const [userData, setUserData] = useState([])
    const imgEndpoint = 'https://image.tmdb.org/t/p/original'
    useEffect(() => {
        setUserData(getUserData('user1'))
    },[])
    return (
        <>
            <Navbar/>
            <div className="searchMovies">
                <Row title={'My List'} data={userData}  imgEndpoint={imgEndpoint} mylist={true}/>
            </div>
        </>
    )
}
