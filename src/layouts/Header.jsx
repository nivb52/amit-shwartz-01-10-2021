//Header.jsx
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { DOLLAR_SIGN, SHEKEL_SIGN } from "../consts";

//const
const menuItemTitles = [
  { id: 1, title: "Purchase by item", path: "/" },
  { id: 2, title: "Purchase by stores", path: "/stores" },
];
const options = [SHEKEL_SIGN, DOLLAR_SIGN];

const Header = () => {
  //state
  const [active, setActive] = useState(menuItemTitles[0].id);
  const [currency, setCurrency] = useState(SHEKEL_SIGN);

  return (
    <div className="header">
      {menuItemTitles.map((menuItem) => (
        <Link to={menuItem.path} key={menuItem.id}>
          <Button
            className={menuItem.id === active ? "selected" : ""}
            onClick={() => {
              setActive(menuItem.id);
            }}
            variant="text"
          >
            {menuItem.title}
          </Button>
        </Link>
      ))}
      <Box sx={{ flexGrow: 1 }} />
      <Select
        value={currency}
        onChange={(value) => setCurrency(value)}
        options={options}
      />
    </div>
  );
};
export default Header;
