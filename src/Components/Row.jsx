import React from 'react'

export default function Row(props) {
    return (
        <div >
            <h2>{props.title}</h2>
            <div className="moviePosterRow">
                {
                    props.data.map(movie => {
                        return <div key={movie.id}>
                            <img className={`moviePoster ${props.isOriginal ? 'bigMoviePoster' : ''}`}
                                src={
                                    props.isOriginal ? props.imgEndpoint + movie.poster_path :
                                        props.imgEndpoint + movie.backdrop_path
                                }
                                alt="poster"
                            />

                        </div>

                    })
                }
            </div>
        </div>
    )
}
