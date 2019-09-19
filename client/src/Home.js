import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Profile from './Components/Perfil'
import Footer from './Components/Footer'
import Login from './Login'

function Home() {
  return (
    <div className="App">
      <Login />
      <Footer />
    </div>
  );
}


export default Home;


