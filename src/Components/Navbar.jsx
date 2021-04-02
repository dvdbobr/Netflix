import React from 'react'

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <div>logo</div>
                <div>Home</div>
                <div>TV Shows</div>
                <div>Movies</div>
                <div>New & Popular</div>
                <div>My List</div>
            </div>
            <div className="navbar-right">
                <div>search</div>
                <div>notifications</div>
                <div>profile</div>
            </div>
        </div>
    )
}
