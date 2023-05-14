import React, {useState, useEffect} from 'react';
import SingleMovie from './SingleMovie';


export default function MovieList({currentPage, setimdbID}) {

  const [movies, setMovies] = useState(null);

  useEffect(() =>{
    fetch('http://sefdb02.qut.edu.au:3000/movies/search?page='+ currentPage)
    .then(res => res.json())
    .then(json =>{
      setMovies(json);
      
    })
  }, []);



  if(movies == null) return <div/>;
  
  return (

      movies.data.map((m) => {return (
         <SingleMovie title={m.title} year={m.year} imdb={m.imdbRating} tomatoe={m.rottenTomatoesRating} meta={m.metacriticRating} rated={m.classification} imdbID={m.imdbID} setimdbID={setimdbID}/>)
      })


  )
}



