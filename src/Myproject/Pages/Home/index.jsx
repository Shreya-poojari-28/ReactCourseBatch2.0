import React from 'react';
import Pagination from '../../Components/Pagination';
import Card from '../../Components/Card';
import './index.css';
import { Link } from 'react-router-dom';

const Home = ({ movies, handleNext, handlePrev, setTotalPages, totalPages, setCurrentPage, currentPage }) => {
  return (
    <div className='container'>
      {movies.map((item, index) => {
        return (
          <Card key={index} id={item.id} src={item.poster_path} item={item}>
            {/* Link to MoviePage when clicking on a movie poster */}
            <Link to={`/movie/${item.id}`}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                alt={item.title}
                className="card-img"
              />
            </Link>
          </Card>
        );
      })}
      <Pagination 
        handleNext={handleNext}
        handlePrev={handlePrev}
        setTotalPages={setTotalPages}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
