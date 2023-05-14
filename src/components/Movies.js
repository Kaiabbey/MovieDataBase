
import { useState } from 'react';
import MovieList from './movieList';
import DetailedMovie from './DetailedMovie';

export default function Movies({currentPage, setCurrentPage}) {

  const [imdbID, setimdbID] = useState(0);

  if(currentPage === 1){
    var pageLeft = 1
    var pageRight = 2
  }
  else if(currentPage === 122){
    pageLeft = 121
    pageRight = 122
  }
  else{
    pageLeft = currentPage - 1
    pageRight = currentPage + 1
  }


  if(imdbID === 0){
    return (
      <div>
        <header>
          <button type="button" class="btn btn-primary" onClick={() => setCurrentPage(pageLeft)}>Back</button>
          <h3>Page {currentPage}</h3>

          <button type="button" class="btn btn-primary" onClick={() => setCurrentPage(pageRight)}>Forward</button>
        </header>
        <MovieList currentPage = {currentPage} setimdbID={setimdbID}/>
        <footer>
          <p>All data is from IMDB, Metacritic and RottenTomatoes.</p>
          <p>© 2023 Firstname Lastname</p>
        </footer>
      </div>
    )
  }
  else{
    return(
      <div>
      <DetailedMovie imdbID={imdbID} setimdbID={setimdbID}/>
      </div>
    )
  }

}

