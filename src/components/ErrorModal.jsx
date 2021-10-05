// ErrorModel.jsx

import React from "react";
import { connect } from "react-redux";
import { hideError } from "../redux/actions/errorAction";
import { Modal } from "react-responsive-modal";
import { Warning } from "@mui/icons-material";

const ErrorModel = ({ isOpen, message, title, hideError }) => {
  return (
    <Modal
      styles={{
        modal: {
          maxWidth: "500px",
          textAlign: "center",
          padding: "35px",
          borderRadius: "7px",
        },
      }}
      center
      open={isOpen}
      onClose={hideError}
      animationDuration={0}
    >
      <Warning sx={{ fontSize: 70 }} />
      <h2>{title}</h2>
      <p className="paragraph">{message}</p>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { isOpen, message, title } = state.error;
  return { isOpen, message, title };
};

export default connect(mapStateToProps, { hideError })(ErrorModel);
