import React from "react";
import Header from "./Header";
import "./layout.scss"

const Layout = ({ children }) => (
    <>
      <Header />
      <div className="site-layout">
        <main className="site-content">{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  );
  
  export default Layout;