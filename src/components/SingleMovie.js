import React from 'react';

export default function MovieList({title,year,imdb,tomatoe,meta,rated,imdbID,setimdbID}) {

  
  
  return (
    <div class="movie" id={imdbID}>
        <h3>{title}</h3>
        <h4>Year: {year}   IMDB rating: {imdb}   RottenTomatoes: {tomatoe}   Metacritic: {meta}   Rating: {rated}</h4>

        <button  type="button" class="btn btn-success" onClick={() => setimdbID(imdbID)} >View</button>
    </div>
  )
}
