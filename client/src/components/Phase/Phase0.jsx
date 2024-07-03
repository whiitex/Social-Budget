import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import DigitalButtons from "../Utility/DigitalButtons";
import "bootstrap-icons/font/bootstrap-icons.css";
import PhaseAPI from "../../API/phase.api.mjs";

const Phase0 = ({ handleBudget, isAdmin }) => {
  const [newBudget, setNewBudget] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    PhaseAPI.updatePhase(1, newBudget)
      .then((response) => {
        handleBudget(newBudget);
        setNewBudget(0);
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div id="budget" className="row mb-5">
      {/* Form for inserting budget amound */}
      <Container className="mt-4 pt-5 d-flex justify-content-center">
        {isAdmin ? (
          <div
            id="budget-definition"
            className="col-11 col-sm-11 col-md-10 col-lg-8"
          >
            <h3>Define budget amount</h3>

            <form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group className="row">
                <div className="col-8 d-flex align-items-center">
                  <Form.Control
                    type="text"
                    className="inputText"
                    placeholder="Enter value"
                    onChange={(e) => {
                      setNewBudget(parseFloat(e.target.value));
                    }}
                  />
                  <DigitalButtons margintop="mt-0" />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <p style={{ color: "red" }}>{errorMessage}</p>
              </Form.Group>
              <div className="pl-0 col-4">
                <Button type="submit" className="btn-primary">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <h3>Waiting for the admin to define the budget amount</h3>
        )}
      </Container>
    </div>
  );
};

export default Phase0;
