import React, { useRef } from "react";
import search_icon from "../assets/images/search_icon.svg";
import { useDispatch } from "react-redux";
import { search } from "../state/search/searchActions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const srchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (srchRef.current && srchRef.current.value !== "")
      dispatch(search(srchRef.current.value));
  };

  return (
    <form className="searchbar-cont" onSubmit={handleSearch}>
      <img src={search_icon} alt="search-icon" />
      <input ref={srchRef} className="search-box" placeholder="Search" />
    </form>
  );
};

export default SearchBar;
