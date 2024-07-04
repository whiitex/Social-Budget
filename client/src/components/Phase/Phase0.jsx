import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import DigitalButtons from "../Utility/DigitalButtons";
import "bootstrap-icons/font/bootstrap-icons.css";
import PhaseAPI from "../../API/phase.api.mjs";

const Phase0 = ({ handleBudget, isAdmin, setShouldRefresh }) => {
  const [newBudget, setNewBudget] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage !== "") return;
    e.target.reset();
    PhaseAPI.updatePhase(1, newBudget)
      .then(() => {
        handleBudget(newBudget);
        setNewBudget(0);
        setShouldRefresh(true);
      })
      .catch((err) => setErrorMessage(err.message));
  };

  // handle DigitalButtons
  const onClickButton = (up) => {
    return (e) => {
      setErrorMessage("");
      const prevNumber =
        parseFloat(
          e.target.parentElement.parentElement.parentElement.children[0].value
        ) || 0;
      const newNumber = prevNumber + (up ? 10 : -10);
      const finalNumber = newNumber >= 0 ? newNumber : 0;
      e.target.parentElement.parentElement.parentElement.children[0].value =
        finalNumber;
      setNewBudget(finalNumber);
      if (finalNumber <= 0) setErrorMessage("Budget must be a positive number");
    };
  };

  const handleSetNewBudget = (e) => {
    let flag = true;
    for (const char of e.target.value) {
      if (!parseInt(char) && char !== '.' && char !== ',' && parseInt(char) !== 0) flag = false;
    }
    if (!flag && e.target.value !== "") setErrorMessage("Budget must be a number");
    else if (parseFloat(e.target.value) <= 0) setErrorMessage("Budget must be a positive number");
    else {
      setErrorMessage("");
      setNewBudget(parseFloat(e.target.value));
    }
  };

  return (
    <div id="budget" className="row mb-5">
      {/* Form for inserting budget amound */}
      <Container className="mt-4 pt-5 d-flex justify-content-center">
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
                  onChange={handleSetNewBudget}
                  autoFocus
                />
                <DigitalButtons
                  margintop="mt-0"
                  onClickButton={onClickButton}
                />
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
      </Container>
    </div>
  );
};

export default Phase0;
