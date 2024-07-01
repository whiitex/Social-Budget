import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";

const Header = ({ isAdmin }) => {
  return (
    <Nav className="navbar-expand-lg navbar-dark bg-dark text-white py-3 fixed-top d-flex justify-content-between">
      <Navbar.Brand className="ml-5 mr-0">Social Budget 2024</Navbar.Brand>

      {isAdmin && (
        <Button type="button" id="adminButton">
          {">>"} next phase {"<<"}
        </Button>
      )}

      <Button className="btn-info mr-5" type="button" id="loginButton">
        Login
      </Button>
    </Nav>
  );
};

export default Header;
