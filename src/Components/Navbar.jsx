import React, { useEffect, useState } from 'react'
import logo from '../Images/logo.png'
import user1 from '../Images/profileIcon1.jpg'
export default function Navbar(props) {
    const [navbarBackground, setNavbarBackground] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setNavbarBackground(true)
            }
            else {
                setNavbarBackground(false)
            }
        })
        return () => {
            window.removeEventListener('scroll',null)
        }
    }, [])
    return (
        <div className={`navbar ${navbarBackground ? 'navbarWithBackground' : ''}`}>
            <div className="navbar-left">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                {/* <div><a href="#">Home</a> </div>
                <div><a href="#">TV Shows</a> </div>
                <div><a href="#">Movies</a> </div>
                <div><a href="#">New & Popular</a> </div>
                <div><a href="#">My List</a> </div> */}
            </div>
            <div className="navbar-right">
                <div>
                    <input type="text" name={props.search} value={props.search} />
                </div>
                <div className="userSelect">
                    <img src={user1} width={40} height={40} alt="" />
                    <div className="userDropDown">
                        <ul>
                            <li className="user1" >user 1</li>
                            <li className="user1" >user 2</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
