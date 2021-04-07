import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.png'
import user1 from '../Images/profileIcon1.jpg'
import user2 from '../Images/profileIcon2.png'
import { inisializeLocal } from '../localStorage.jsx'
export default function UserPage() {
    inisializeLocal('user1');
    inisializeLocal('user2');

    return (
        <>
            <div className="navbar">
                <div className="navbar-left">
                    <div className="logo ">
                        <img src={logo} alt="" />
                    </div>
                </div>
            </div>
            <div className="userMain">
                <div>
                    <h1>Who's watching?</h1>
                </div>
                <div className="users">
                    <div className="userRow">
                        <div className="userItem">
                            <Link to={'/main'}><img src={user1} alt="" /></Link>
                            <Link to={'/main'}><span className="userName">user 1</span></Link>
                        </div>
                        <div className="userItem">
                            <Link to={'/main/user2'}><img src={user2} alt="" /></Link>
                            <Link to={'/main/user2'}><span className="userName">user 2</span></Link>
                        </div>
                    </div>
                </div>
                <button className="manageProfile">MANAGE PROFILES</button>
            </div>
        </>
    )
}
