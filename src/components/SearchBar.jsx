import { Search } from "@mui/icons-material";
import React, { useState } from "react";

const SearchBar = ({
  style,
  handleSearchChange,
  placeholder = "Search..",
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    handleSearchChange(e.target.value);
  };

  return (
    <div style={style} className={`search-container`}>
      <div>
        <Search/>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="off"
        name="search"
        value={searchValue}
        onChange={(e) => handleChange(e)}
        onFocus={(e) => e.target.select()}
      />
    </div>
  );
};
export default SearchBar;
