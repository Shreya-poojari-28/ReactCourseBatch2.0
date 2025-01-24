import React from 'react'
import './index.css'

const index = ({ handleNext, handlePrev, currentPage, setCurrentPage, totalPages, setTotalPages }) => {
  return (
    <div>
        <button className='btn' onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        {currentPage} / {totalPages}
        <button className='btn' onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
    </div>
  )
}

export default index