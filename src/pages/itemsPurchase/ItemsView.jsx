//Header.jsx
import { Button } from "@mui/material";
import React, { useState } from "react";

//const
const menuItemTitles = [
  { id: 1, title: "Delivery" },
  { id: 2, title: "Archive Items" },
];

const ItemsView = () => {
  //state
  const [active, setActive] = useState(menuItemTitles[0].id);

  return (
      <>
    <div className="header header__gray">
      {menuItemTitles.map((menuItem) => (
          <Button
          key={menuItem.id}
            className={menuItem.id === active ? "selected" : ""}
            onClick={() => {
              setActive(menuItem.id);
            }}
            variant="text"
          >
            {menuItem.title}
          </Button>
      ))}
    </div>
    </>
  );
};
export default ItemsView;
