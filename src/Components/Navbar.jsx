import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.png'
import user1 from '../Images/profileIcon1.jpg'
import { FaSearch } from 'react-icons/fa'
export default function Navbar(props) {
    const [navbarBackground, setNavbarBackground] = useState(false)
    const [term, setTerm] = useState('')
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
            window.removeEventListener('scroll', null)
        }
    }, [])

    return (
        <div className={`navbar ${navbarBackground ? 'navbarWithBackground' : ''}`}>
            <div className="navbar-left">
                <div className="logo">
                    <Link to={"/main"}><img src={logo} alt="logo" /></Link>
                </div>
                <div><Link to={"/main"}>Home</Link> </div>
                <div><Link to={"/tv"}>TV Shows </Link></div>
                <div><Link to={"/movies"}>Movies</Link> </div>
                <div><Link to={"/mylist"}>My List</Link> </div>
            </div>
            <div className="navbar-right">
                <input type="text"
                    name={props.search}
                    value={props.search}
                    placeholder={'movies or tv series'}
                    className="searchInput"
                    onChange={(e) => setTerm(e.target.value)}
                />
                <div>
                    {term && <Link to={`/search/${term}`}><FaSearch size={20} /></Link>}
                </div>
                <div className="userSelect">
                    <img src={user1} width={40} height={40} alt="" />
                    <div className="userDropDown">
                        <ul>
                            <li className="user1" >user 1</li>
                            <li className="user2" > user 2</li>
                            <hr style={{ marginTop: 15, marginRight: 15 }} />
                            <li><Link to={'/'}>Sign out of Netflix</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
