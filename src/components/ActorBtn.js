import React, { Component } from 'react';

export function ActorBtn(props){

        const text = props.data.Name.name
        return (
            <button onClick={() => {props.setActor(props.data.Name.id); props.setDetails(null)}} class="btn btn-primary actorbtn" type="button"  aria-expanded="false">
            {text}
        </button>

        );    
}