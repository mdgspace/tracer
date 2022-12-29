import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchAction } from "../state/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current && searchRef.current.value !== "")
      dispatch(searchAction(searchRef.current.value));
  };

  return (
    <form className="search-container" onSubmit={handleSearch}>
      <input ref={searchRef} className="search-input" placeholder="Search" />
    </form>
  );
};

export default SearchBar;
