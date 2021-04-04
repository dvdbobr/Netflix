import React from 'react'
import logo from '../Images/logo.png'
import user1 from '../Images/profileIcon1.jpg'
export default function UserPage() {
    return (
        <div className="userMain">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div>
                <h1>Who's watching?</h1>
            </div>
            <div className="users">
                <div className="userRow">
                    <img src={user1} alt="" />
                    <span className="userName">user 1</span>
                </div>
            </div>
            <button className="manageProfile">MANAGE PROFILES</button>
        </div>
    )
}
