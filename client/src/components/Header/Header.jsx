import React, { useState } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import Login from "../Auth/Login";

const Header = ({ isAdmin, user, handleLogin, handleLogout }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Nav className="navbar-expand-lg navbar-dark bg-dark text-white py-3 fixed-top d-flex justify-content-between">
        <Navbar.Brand className="ml-5 mr-0">Social Budget 2024</Navbar.Brand>

        {isAdmin && (
          <Button type="button" id="adminButton">
            {">> next phase <<"}
          </Button>
        )}

        {user ? (
          <div>
            <Navbar.Brand className="ml-5 mr-3">{user.username}</Navbar.Brand>
            <Button className="btn-info mr-5" type="button" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            className="btn-info mr-5"
            type="button"
            id="loginButton"
            onClick={() => setShow(true)}
          >
            Login
          </Button>
        )}
      </Nav>

      <Login show={show} setShow={setShow} handleLogin={handleLogin}/>
    </>
  );
};

export default Header;
