import React from 'react';
import './search-box.styles.css';


const SearchBox = ({ placeholder, handleSearch }) => {
  return (
    <input className='search' type='text' placeholder={placeholder} onChange={handleSearch} />
  );
}
export default SearchBox;
