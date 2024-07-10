import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Proposal1 from "../Proposal/Proposal1";
import DigitalButtons from "../Utility/DigitalButtons";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProposalAPI from "../../API/proposal.api.mjs";

const Phase1 = ({ budget, setShouldRefresh, proposals }) => {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [errorDescMessage, setErrorDescMessage] = useState("");
  const [errorCostMessage, setErrorCostMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // check for errors
    if (errorDescMessage !== "" || errorCostMessage !== "") return;
    setErrorMessage("");

    const proposal = { description, cost };
    e.target.reset();
    setDescription("");
    setCost(0);

    ProposalAPI.insertProposal(proposal)
      .then(() => setShouldRefresh(true))
      .catch((err) => {
        if (err.message === "Not in phase 1") setShouldRefresh(true);
        else setErrorMessage(err.message ? err.message : err);
      });
  };

  // handle DigitalButtons
  const onClickButton = (up) => {
    return (e) => {
      setErrorCostMessage("");
      const prevNumber =
        parseFloat(
          e.target.parentElement.parentElement.parentElement.children[0]
            .children[1].value
        ) || 0;
      const newNumber = prevNumber + (up ? 10 : -10);
      let finalNumber = newNumber >= 0 ? newNumber : 0;
      if (finalNumber > budget) finalNumber = budget;
      e.target.parentElement.parentElement.parentElement.children[0].children[1].value =
        finalNumber;
      setCost(finalNumber);
    };
  };

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
    if (description.length > 90)
      setErrorDescMessage("Description cannot exceed 90 characters");
    else setErrorDescMessage("");
  };

  const handleSetCost = (e) => {
    let flag = true;
    for (const char of e.target.value) {
      if (
        !parseInt(char) &&
        char !== "." &&
        char !== "," &&
        parseInt(char) !== 0
      )
        flag = false;
    }
    if (!flag && e.target.value !== "")
      setErrorCostMessage("Cost must be a number");
    else {
      setErrorCostMessage("");
      if (e.target.value > budget)
        setErrorCostMessage("Cost cannot exceed budget");
      setCost(parseFloat(e.target.value));
    }
  };

  return (
    <div id="proposals" className="mb-5">
      <div className="row">
        {proposals.map((proposal, index) => (
          <Proposal1
            key={proposal.id}
            proposal={proposal}
            setShouldRefresh={setShouldRefresh}
            setErrorMessage={setErrorMessage}
            setCost={setCost}
            setDescription={setDescription}
          />
        ))}
      </div>
      {/* Form for inserting a new proposal */}
      <Container className="mt-4 pt-5">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-10 col-md-9 col-lg-7">
            <h3>Insert new proposal</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <label className="mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="form-control inputText"
                  id="description"
                  rows="3"
                  placeholder="Enter description"
                  onChange={handleSetDescription}
                  autoFocus
                ></textarea>
              </Form.Group>
              <Form.Group className="row">
                <div className="col-8 d-flex align-items-center pl-0">
                  <div className="d-flex flex-column flex-grow-1 ml-3 justify-content-center">
                    <label className="mb-1" htmlFor="cost">
                      Cost
                    </label>
                    <input
                      type="text"
                      className="form-control inputText"
                      id="cost"
                      placeholder="Enter value"
                      onChange={handleSetCost}
                    />
                  </div>
                  <DigitalButtons
                    margintop="mt-4"
                    onClickButton={onClickButton}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <p style={{ color: "red" }}>
                  {errorMessage || errorCostMessage || errorDescMessage}
                </p>
              </Form.Group>
              <Button type="submit" className="btn-primary">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Phase1;
