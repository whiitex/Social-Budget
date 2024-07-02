import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const Login = ({ show, setShow, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { username, password };
    e.target.reset();
    setUsername("");
    setPassword("");

    handleLogin(credentials)
      .then(() => {
        setErrorMessage("");
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Unauthorized")
          setErrorMessage("Invalid username and/or password");
        else setErrorMessage(err.message);
        setShow(true);
      });
  };

  return (
    // Login Modal
    <Modal
      className="fade"
      id="loginModal"
      tabIndex="-1"
      show={show}
      onHide={() => setShow(false)}
      //   aria-labelledby="loginModalLabel"
      //   aria-hidden="true"
    >
      <Modal.Dialog className="m-0">
        <Modal.Body className="p-0">
          <Modal.Header>
            <h5 className="modal-title" id="loginModalLabel">
              Login
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setShow(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <div className="modal-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <p style={{ color: "red" }}>{errorMessage}</p>
              </Form.Group>
              <Button type="submit" className="btn-primary">
                Sign in
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

export default Login;
