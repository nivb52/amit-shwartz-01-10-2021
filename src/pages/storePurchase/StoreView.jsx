import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Table from "../../components/Table";
import { SHEKEL_SIGN } from "../../consts";
import { store_columns } from "./columns";

const ItemsView = ({ currentCurrency, rate, localItems }) => {
  //state
  const [data, setData] = useState([]);

  const arrangeDate = useMemo(
    () => async () => {
      let data_obj = {};
      let localItemsArray = Object.values(localItems);
      await localItemsArray.forEach((item) => {
         
        let price_to_save = item.price;
        if (currentCurrency.value === SHEKEL_SIGN.value) {
          price_to_save = item.price * rate;
        }
        if (data_obj[item.store]) {
          data_obj[item.store].quantity += 1;
          data_obj[item.store].price += price_to_save;
        } else {
          data_obj[item.store] = { price: price_to_save, quantity: 1, store: item.store };
        }
      });

      setData(Object.values(data_obj));
    },
    [localItems, currentCurrency, rate]
  );

  useEffect(() => {
    arrangeDate();
  }, [arrangeDate]);

  const columns = useMemo(() => store_columns, []);

  return (
    <>
      <div className="header header__gray"></div>
      <Table currencySign={currentCurrency.label} {...{ data, columns }} />
    </>
  );
};

const mapStateToProps = (state) => {
  const { localItems } = state.items;
  const { currentCurrency, rate } = state.currency;

  return {
    currentCurrency,
    rate,
    localItems,
  };
};

export default connect(mapStateToProps)(ItemsView);
