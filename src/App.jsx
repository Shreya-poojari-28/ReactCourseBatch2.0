import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Navbar from './Myproject/Components/Navbar';
import Footer from './Myproject/Components/Footer';
import Home from './Myproject/Pages/Home';
import MoviePage from './Myproject/Pages/MoviePages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const Api_key = '76c7e9ee4d6c534cee7e0ecd507e626b';
  const BaseUrl = 'https://api.themoviedb.org/3/';
  const image_url = 'https://image.tmdb.org/t/p/original';

  const [movie, setMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  // Fetch popular movies
  async function fetchAllMovie(page = 1) {
    const params = {
      api_key: Api_key,
      page: page,
    };
    const response = await axios.get(`${BaseUrl}discover/movie`, { params });
    setMovie(response.data.results);
    setTotalPages(response.data.total_pages);
  }

  // Fetch search results
  async function fetchSearchMovie(query, page = 1) {
    const params = {
      api_key: Api_key,
      page: page,
      query: query,
    };
    const response = await axios.get(`${BaseUrl}search/movie`, { params });
    setMovie(response.data.results);
    setTotalPages(response.data.total_pages);
  }

  useEffect(() => {

    if (search === '') {
      fetchAllMovie(currentPage);
    } else {
      fetchSearchMovie(search, currentPage);
    }
  }, [search, currentPage]);

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }


  return (
    
      <>
      <BrowserRouter>
      <Navbar search = {search} setSearch ={setSearch}/>
      <Routes>
        <Route path='/' element = {<Home 
        movies = {movie}
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        totalPages = {totalPages}
        setTotalPages = {setTotalPages}
        handlePrev = {handlePrev}
        handleNext = {handleNext}
        />}/>
        <Route path='/movie/:id' element ={<MoviePage/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>

      
      </>
  );
}

export default App;

