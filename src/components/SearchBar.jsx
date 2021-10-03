import React, { useRef, useState } from "react";
import OutsideAlerter from "../../Hooks";

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
        <i className="fa fa-search"></i>
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
