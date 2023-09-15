// src/App.js
import React from 'react';

import Search from './component/Search';
import NowPlaying from './component/NowPlaying';
import HomePage from './component/HomePage';
import MovieDetails from './component/MovieDetails';
import layout from './component/layout';
import Layout from './component/layout';
import Header from './component/Header';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import MovieCard from './component/MovieCard';

function App() {
  return (
    <div className='App'>
      
    <Routes>
      
      <Route path='/' element={ <Layout />}></Route>
      <Route path='head' element={ <Header />}></Route>
     
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
    <Footer />
    </div>
  );
  
}

export default App;
