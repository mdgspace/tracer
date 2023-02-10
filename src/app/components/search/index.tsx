import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { searchAction } from 'features/home/slices/projectSearchSlice';
import search_icon from 'app/assets/images/search_icon.svg';
import './index.scss';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current && searchRef.current.value !== '')
      dispatch(searchAction(searchRef.current.value));
  };

  return (
    <form className='search-container' onSubmit={handleSearch}>
      <img src={search_icon} alt='search-icon' />
      <input ref={searchRef} className='search-input' placeholder='Search' />
    </form>
  );
};

export default SearchBar;
