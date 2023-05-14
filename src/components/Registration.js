import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

export default function Registeration() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if( password1 === password2 && password1 !== ''){
            var data = {"email": email, "password" : password1};
            fetch('http://sefdb02.qut.edu.au:3000/user/register', {
                method: "POST",
                headers : { "Content-Type": "application/json" },
                body : JSON.stringify(data)
            })
            .then(res => {
                if(res.status === 409){
                    alert("User Already Exists"); 
                    navigate("/");
                }
                else if(res.status === 201){
                    alert("User Created!");
                    navigate("/Login");
                }
                else if(res.status === 400){
                    alert("Both Email and Password are required");
                }
                else if(res.status === 429){
                    alert("Too Many Attempts! try again later")
                }

            })

    
        }
        else{
            alert("Passwords are blank or Do Not Match");
        }

    }   

  return (
    <div>
    <section>
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input  onChange={ e => setEmail(e.target.value)} type="email" class="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input  onChange={ e => setPassword1(e.target.value)} type="password" class="form-control" id="Password1" placeholder="Password"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input  onChange={ e => setPassword2(e.target.value)} type="password" class="form-control" id="Password2" placeholder="Password"/>
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

