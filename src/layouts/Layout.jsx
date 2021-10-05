import React, { useEffect } from "react";
import { connect } from "react-redux";
import ErrorModal from "../components/ErrorModal";
import { fetchCurrency } from "../redux/actions/currencyAction";
import Header from "./Header";
import "./layout.scss";

const Layout = ({ fetchCurrency, children }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrency();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchCurrency]);

  return (
    <>
      <ErrorModal />
      <Header />
      <div className="site-layout">
        <main className="site-content">{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default connect(null, { fetchCurrency })(Layout);
