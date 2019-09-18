import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Profile from './Components/Perfil'
import Footer from './Components/Footer'


function Home() {
  return (
    <div className="App">
      <div>
        <Link to={'./list'}>
          <button variant="raised">
              My List
          </button>
        </Link>
      </div>
      <Profile />
      <Footer />
    </div>
  );
}


export default Home;


