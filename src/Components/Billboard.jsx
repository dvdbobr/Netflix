import React from 'react'
import {GrPlayFill} from 'react-icons/gr'
import {BiInfoCircle} from 'react-icons/bi'
export default function Billboard(props) {
    const movieIndex = props.originals[Math.floor(Math.random() * props.originals.length)]
    return (
        <div className="billboard"
            style={{
                background: `url(${props.imgEndpoint + movieIndex.backdrop_path}) no-repeat center center / cover`,
                
            }}
        >
            <div className="billboardDetails">
                <div className="shadow"></div>
                <h1>{movieIndex.name}</h1>
                <div className="billboardDescription">
                    <p>{movieIndex.overview}</p>
                </div>
                <div className="billboardButtons">
                <button className="billBoardPlay"><GrPlayFill/> Play</button>
                <button className="billBoardInfo"><BiInfoCircle size={34}/> More Info</button>
                </div>
            </div>
        </div>
    )
}
