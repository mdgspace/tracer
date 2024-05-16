import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchAction } from 'features/workspace/slices/projectSearchSlice';
import search_icon from 'app/assets/images/search_icon.svg';
import './index.scss';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search,setSearch] = useState('')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchAction(search));
  };

  return (
    <form className='search-container' onSubmit={handleSearch}>
      <img src={search_icon} alt='search-icon' />
      <input
        onChange={handleInputChange}
        className='search-input'
        placeholder='Search'
      />
    </form>
  );
};

export default SearchBar;
