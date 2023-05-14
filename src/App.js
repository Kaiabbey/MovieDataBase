import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Movies from './components/Movies';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';





function App() {

  const [LoggedIn, setLogin] = useState('false');

  function logChange(test){

    setLogin(test);
  }
  
  const MoviesPage = () => (<Movies currentPage={currentPage} setCurrentPage={setCurrentPage}/>);
  const HomePage = () => (<Home/>);
  const RegistrationPage = () => (<Registration/>);
  const LoginPage = () => (<Login logChange={logChange} />);
  const [currentPage, setCurrentPage] = useState(1);

  async function Logout(){
    var data = {"refreshToken": localStorage.getItem("refreshToken")}
    fetch('http://sefdb02.qut.edu.au:3000/user/logout', {
            method: "POST",
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(data)
        }).then(() => {
          logChange('false');
          localStorage.clear()
        })

  }

  //code to potentially be use in accessing actor data
  async function refreshLogin(){
    var data = {"refreshToken": localStorage.getItem("refreshToken")}
    const res = await fetch('http://sefdb02.qut.edu.au:3000/user/refresh', {
            method: "POST",
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(data)
        })
        const jsonData = await res.json();
        if(res.status === 200){
          localStorage.setItem("refreshToken", jsonData.refreshToken.token);
          localStorage.setItem("bearerToken", jsonData.bearerToken.token);
          logChange('true');
        }
        else{
        }
  } 

  useEffect(() => {
    refreshLogin();
  }, [])



    if(LoggedIn === 'false'){
      return(
        <BrowserRouter>
        <div className="App">
          <aside>
            <ul class="nav">
              <li class="nav-item">
              <Link class="nav-link" to ={'/'}>Home</Link>
              </li>
              <li class="nav-item">
              <Link class="nav-link" to ={'/Movies'}>Movies</Link>
              </li>
              <li class="nav-item">
              <Link class="nav-link" to ={'/Registration'}>Register</Link>
              </li>
              <li class="nav-item">
              <Link class="nav-link" to ={'/Login'}>Login</Link>
              </li>
            </ul>
          </aside>
  
          <main>
            <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='/Movies' element={<MoviesPage/>}></Route>
              <Route path='/Registration' element={<RegistrationPage/>}></Route>
              <Route path='/Login' element={<LoginPage logChange={Logout}/>}></Route>
            </Routes>
          </main>
        </div>
        </BrowserRouter>
      )
  
    }
    else{
      return(
        <BrowserRouter>
        <div className="App">
          <aside>
            <ul class="nav">
              <li class="nav-item">
              <Link class="nav-link" to ={'/'}>Home</Link>
              </li>
              <li class="nav-item">
              <Link class="nav-link" to ={'/Movies'}>Movies</Link>
              </li>
              <li class="nav-item">
              <Link class="nav-link" onClick={() => Logout()} >Logout</Link>
              </li>
              <li class="nav-item">
              <Link>{localStorage.getItem("Email")}</Link>
              </li>
            </ul>
          </aside>
  
          <main>
            <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='/Movies' element={<MoviesPage/>}></Route>
            </Routes>
          </main>
        </div>
        </BrowserRouter>
      )
    }
  


  }


export default App;
