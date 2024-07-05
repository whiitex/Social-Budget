import React, { useState } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import PhaseAPI from "../../API/phase.api.mjs";
import Login from "../Auth/Login";

const Header = ({
  isAdmin,
  user,
  phase,
  handleLogin,
  handleLogout,
  setShouldRefresh,
  socket,
}) => {
  const [show, setShow] = useState(false);

  const handleNextPhaseButton = () => {
    // get to next phase
    PhaseAPI.updatePhase(phase + 1)
      .then(() => {
        socket.emit("phase", phase + 1);
        setShouldRefresh(true);
      })
      .catch((err) => console.error(err.message));
  };

  const handleResetButton = () => {
    // reset all
    PhaseAPI.resetAll()
      .then(() => {
        socket.emit("phase", 0);
        setShouldRefresh(true);
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <>
      <Nav className="navbar-expand-lg navbar-dark bg-dark text-white py-3 fixed-top d-flex justify-content-between">
        <Navbar.Brand className="ml-5 mr-0">Social Budget 2024</Navbar.Brand>

        {isAdmin && phase > 0 && phase !== 3 ? (
          <Button
            onClick={handleNextPhaseButton}
            type="button"
            id="adminButton"
          >
            {">> next phase <<"}
          </Button>
        ) : isAdmin && phase === 3 ? (
          <Button onClick={handleResetButton} type="button" id="adminButton">
            {">> reset <<"}
          </Button>
        ) : (
          <></>
        )}

        {user ? (
          <div>
            <Navbar.Brand className="ml-5 mr-3">{user.username}</Navbar.Brand>
            <Button
              className="btn-info mr-5"
              type="button"
              onClick={handleLogout}
            >
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

      <Login
        show={show}
        setShow={setShow}
        handleLogin={handleLogin}
        setShouldRefresh={setShouldRefresh}
      />
    </>
  );
};

export default Header;
