// src/App.js
import React,{useState} from 'react';



import HomePage from './component/HomePage';
import MovieDetails from './component/MovieDetails';
import layout from './component/layout';
import Layout from './component/layout';
import Header from './component/Header';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import MovieCard from './component/MovieCard';

import SearchResults from './component/searchresult';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const updateSearchResults = (results) => {
    setSearchResults(results);
  };
  return (
    <div className='App'>
        
    <Routes>
      
        
      {/* <Route path='/' element={ <Layout />}></Route> */}
      <Route path='/' element={ <Header />}></Route>
     
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/searchpg" element={<searchResults />} />
    </Routes>
    {/* <Footer /> */}
    </div>
  );
  
}

export default App;
