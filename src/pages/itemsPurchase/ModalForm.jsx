// ModalForm.jsx

import { Button } from "@mui/material";
import { isEmpty, isFunction, isUndefined } from "lodash";
import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import { Modal } from "react-responsive-modal";
import AutoComplete from "../../components/AutoComplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DOLLAR_SIGN } from "../../consts";
import { getSafe } from "../../helpers";
import { addDeliveredItem } from "../../redux/actions/itemsAction";
import { format } from "date-fns";

const ModalForm = ({
  onClose,
  open,
  itemsList = [],
  currentCurrency,
  addDeliveredItem,
  rate,
}) => {
  const initialState = {
    title: "",
    store: "",
    price: "",
    delivery: "",
  };

  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const handleClose = () => {
    if (isFunction(onClose)) {
      onClose();
    }
    setFormValues(initialState);
    setFormErrors({});
  };

  const renderError = (name) => {
    if (formErrors[name])
      return (
        <p style={{ width: "100%", textAlign: "center" }}>
          <span className="error-msg">{formErrors[name]}</span>{" "}
        </p>
      );
  };

  const validate = useMemo(
    () =>
      ({ title, price, delivery, store }) => {
        let errors = {};
        if (!title) {
          errors.title = "Item field is required.";
        }
        if (!price) {
          errors.price = "Price field is required.";
        }
        if (!delivery) {
          errors.delivery = "Delivery Date field is required.";
        }
        if (!store) {
          errors.store = "Store field is required.";
        }
        setFormErrors(errors);
        if (!isEmpty(errors)) return false;
        else return true;
      },
    []
  );

  const handleSubmit = useMemo(
    () => (formValues) => {
      if (validate(formValues)) {
        addDeliveredItem({
          ...formValues,
          delivery: format(formValues.delivery, "dd/MM/yy"),
        });
      }
    },
    [addDeliveredItem, validate]
  );
  return (
    <Modal
      styles={{
        modal: {
          maxWidth: "500px",
          textAlign: "center",
          padding: "40px",
          borderRadius: "7px",
        },
      }}
      center
      open={open}
      onClose={handleClose}
      animationDuration={200}
    >
      <h1>Add Item</h1>
      <div className="flex-column form">
        <div className="flex-between fluid">
          <label>
            * Item
            <AutoComplete
              onInputChange={(event, value) => {
                setFormValues({ ...formValues, title: value });
              }}
              onChange={(event, value) =>
                setFormValues({
                  ...formValues,
                  title: getSafe(() => value.title, ""),
                  price: getSafe(() => value.price, ""),
                })
              }
              options={itemsList.map((x) => ({ ...x, label: x.title }))}
            />
            {renderError("title")}
          </label>
          <label>
            * Store
            <input
              type="text"
              value={formValues.store}
              onChange={(e) => {
                e.preventDefault();
                setFormValues({ ...formValues, store: e.target.value });
              }}
            />
            {renderError("store")}
          </label>
        </div>
        <div className="flex-between fluid">
          <label>
            * Price
            <div className="price-input">
              <span>{getSafe(() => currentCurrency.label, "")}</span>
              <input
                type="text"
                value={Number(formValues.price).toFixed(2)}
                onChange={(e) => {
                  e.preventDefault();
                  setFormValues({ ...formValues, price: e.target.price });
                }}
              />
            </div>
            {renderError("price")}
          </label>
          <label>
            * Delivery
            <DatePicker
              selected={formValues.delivery}
              onChange={(newValue) => {
                console.log(newValue);
                setFormValues({ ...formValues, delivery: newValue });
              }}
            />
            {renderError("delivery")}
          </label>
        </div>
        <div className="flex-end fluid">
          <Button
            style={{ margin: "10px" }}
            variant="outlined"
            onClick={() => handleClose()}
            color="error"
          >
            Cancel
          </Button>
          <Button
            style={{ margin: "10px" }}
            variant="outlined"
            onClick={() => handleSubmit(formValues)}
            color="primary"
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { addDeliveredItem })(ModalForm);
