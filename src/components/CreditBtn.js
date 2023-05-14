import React, { Component } from 'react';

export function CreditBtn(props){
        
        const text = props.data.Movie.movieName;
        return (
            <button onClick={() => {props.setimdbID(props.data.Movie.movieId);props.setActor("");props.setDetails(null)}} class="btn btn-primary actorbtn" type="button"  aria-expanded="false">
            {text}
        </button>

        );    
}