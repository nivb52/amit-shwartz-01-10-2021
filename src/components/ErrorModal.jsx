// ErrorModel.jsx

import React from "react";
import { connect } from "react-redux";
import { hideError } from "../../redux/actions/errorAction";
import { Modal } from "react-responsive-modal";
import redWarning from "../../images/metro-warning.svg";
import yellowWarning from "../../images/yellow-metro-warning.svg";

const ErrorModel = ({
  isOpen,
  errorMsg,
  errorTitle,
  hideError,
  timeout,
  warning,
}) => {
  if (isOpen && timeout) {
    setTimeout(() => {
      hideError();
    }, 3000);
  }

  return (
    <Modal
      styles={{
        modal: { maxWidth: "50rem", textAlign: "center", padding: "3.5rem" },
      }}
      center
      open={isOpen}
      showCloseIcon={!timeout}
      onClose={hideError}
      animationDuration={0}
    >
      <img
        alt=""
        style={{ width: "84px" }}
        src={warning ? yellowWarning : redWarning}
      />
      <h2>{errorTitle}</h2>
      <div className="paragraph">{errorMsg}</div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { isOpen, errorMsg, errorTitle, timeout, warning } = state.error;
  return { isOpen, errorMsg, errorTitle, timeout, warning };
};

export default connect(mapStateToProps, { hideError })(ErrorModel);
