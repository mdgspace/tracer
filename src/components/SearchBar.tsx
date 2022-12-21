import React, {useRef} from "react";
import search_icon from "../assets/images/search_icon.svg";
import {useDispatch} from "react-redux";
import {searchAction} from "../state/search/searchActions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current && searchRef.current.value !== "")
      dispatch(searchAction(searchRef.current.value));
  };

  return (
    <form className="searchbar-cont" onSubmit={handleSearch}>
      <img src={search_icon} alt="search-icon"/>
      <input ref={searchRef} className="search-box" placeholder="Search"/>
    </form>
  );
};

export default SearchBar;
