import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

export default function Login({logChange}) {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if( password !== "" || email !== ""){
            var data = {"email": email, "password" : password, "longExpiry": true};
            login(data);
        }
        else{
            alert("Credentials cannot be blank");
        }

    }
    
    async function login(data){
        const res = await fetch('http://sefdb02.qut.edu.au:3000/user/login', {
            method: "POST",
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(data)
        })

        const jsonData = await res.json();

        if(res.status === 200){
            localStorage.setItem("Email", email)
            
            localStorage.setItem("refreshToken", jsonData.refreshToken.token);
            localStorage.setItem("bearerToken", jsonData.bearerToken.token);
            alert("Logged in!");
            logChange('true');
            navigate('/');
        }
        else if(res.status === 400){
            alert("Both Email and Password are required");
        }
        else if(res.status === 401){
            alert("Incorrect email or password");
        }
        else if(res.status === 429){
            alert("Too Many Attempts! try again later")
        }

    }



  return (
    <div>
    <section>
        <h1>Login</h1>
                <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input  onChange={ e => setEmail(e.target.value)} type="email" class="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input  onChange={ e => setPassword(e.target.value)} type="password" class="form-control" id="Password" placeholder="Password"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </section>
    <footer>
      <p>All data is from IMDB, Metacritic and RottenTomatoes.</p>
      <p>© 2023 Firstname Lastname</p>


    </footer>
    </div>

  )
}
