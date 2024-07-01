import React from "react";
import { Navbar, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className="navbar-expand-lg navbar-dark bg-dark text-white py-2 fixed-top d-flex justify-content-between">
      <Navbar.Brand className="ml-5 mr-0">Social Budget 2024</Navbar.Brand>
      <Button type="button" id="adminButton">
        {">>"} next phase {"<<"}
      </Button>
      <Button className="btn-info mr-5" type="button" id="loginButton">
        Login
      </Button>
    </Navbar>
  );
};

export default Header;
