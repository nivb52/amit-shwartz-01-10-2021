//Header.jsx
import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Table from "../../components/Table";
import { SHEKEL_SIGN } from "../../consts";
import {
  clearItemsList,
  fetchItemsList,
  moveItemToArchive,
  moveItemToDelivery,
} from "../../redux/actions/itemsAction";
import { delivered_columns } from "./columns";
import ModalForm from "./ModalForm";

//const
const menuItemTitles = [
  { id: 1, title: "Delivery" },
  { id: 2, title: "Archive Items" },
];

const ItemsView = ({
  currentCurrency,
  rate,
  itemsList,
  localItems,
  clearItemsList,
  fetchItemsList,
  moveItemToArchive,
  moveItemToDelivery,
}) => {
  //state
  const [active, setActive] = useState(menuItemTitles[0].id);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchItemsList();
    return () => {
      clearItemsList();
    };
  }, [clearItemsList, fetchItemsList]);

  const arrangeDate = useMemo(
    () => async () => {
      let localItemsArray = Object.values(localItems);
      if (isDeliveryView) {
        localItemsArray = localItemsArray.filter((x) => !x.isArchived);
      } else {
        localItemsArray = localItemsArray.filter((x) => x.isArchived);
      }
      if (currentCurrency.value === SHEKEL_SIGN.value) {
        localItemsArray = localItemsArray.map((x) => ({
          ...x,
          price: x.price * rate,
        }));
      }
      setData(localItemsArray);
    },
    [localItems, active, currentCurrency, rate]
  );

  useEffect(() => {
    arrangeDate();
  }, [arrangeDate]);

  const columns = useMemo(() => delivered_columns, []);

  const list = useMemo(() => {
    if (currentCurrency.value === SHEKEL_SIGN.value) {
      return itemsList.map((x) => ({
        ...x,
        price: x.price * rate,
      }));
    } else {
      return itemsList;
    }
  }, [currentCurrency, rate, itemsList]);

  const isDeliveryView = active === 1;

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
      <ModalForm
        onClose={() => setOpen(false)}
        {...{ currentCurrency, rate, itemsList: list, open }}
      />
      <Table
        action={isDeliveryView ? moveItemToArchive : moveItemToDelivery}
        currencySign={currentCurrency.label}
        {...{ data, columns, setOpen, isDeliveryView }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const { itemsList, localItems } = state.items;
  const { currentCurrency, rate } = state.currency;

  return {
    currentCurrency,
    rate,
    itemsList: Object.values(itemsList),
    localItems,
  };
};

export default connect(mapStateToProps, {
  clearItemsList,
  fetchItemsList,
  moveItemToArchive,
  moveItemToDelivery,
})(ItemsView);
