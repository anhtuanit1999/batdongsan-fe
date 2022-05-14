import React, { Component } from "react";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.js";
import RouterURL from "./components/RouterURL.js";
import Footer from "./components/Footer.js";
import "./CSS/Main.css";
import "./CSS/Login.css";

function Main() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <RouterURL />
      <Footer />
    </BrowserRouter>
  );
}

export default Main;
