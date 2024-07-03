import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Proposal1 from "../Proposal/Proposal1";
import DigitalButtons from "../Utility/DigitalButtons";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProposalAPI from "../../API/proposal.api.mjs";

const Phase1 = ({ user }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setShouldRefresh(false);
    ProposalAPI.getAllProposals()
      .then((propos) => {
        setErrorMessage("");
        setProposals(propos.filter((p) => p.author === user.username));
      })
      .catch((err) => setErrorMessage(err.message));
  }, [user, shouldRefresh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const proposal = { description, cost };
    e.target.reset();
    setDescription("");
    setCost(0);

    ProposalAPI.insertProposal(proposal)
      .then(() => setShouldRefresh(true))
      .catch((err) => setErrorMessage(err.message));
  };

  // handle DigitalButtons
  const onClickButton = (up) => {
    return (e) => {
      setErrorMessage("");
      const prevNumber =
        parseFloat(
          e.target.parentElement.parentElement.parentElement.children[0]
            .children[1].value
        ) || 0;
      const newNumber = prevNumber + (up ? 10 : -10);
      const finalNumber = newNumber >= 0 ? newNumber : 0;
      e.target.parentElement.parentElement.parentElement.children[0].children[1].value =
        finalNumber;
      setCost(finalNumber);
    };
  };

  const handleSetCost = (e) => {
    let flag = true;
    for (const char of e.target.value) {
      if (!parseInt(char) && char !== '.' && char !== ',') flag = false;
    }
    if (!flag && e.target.value !== "") setErrorMessage("Cost must be a number");
    else {
      setErrorMessage("");
      setCost(parseFloat(e.target.value));
    }
  };

  return (
    <div id="proposals" className="row mb-5">
      {proposals.map((proposal, index) => (
        <Proposal1
          key={proposal.id}
          id={proposal.id}
          cost={proposal.cost}
          description={proposal.description}
          setShouldRefresh={setShouldRefresh}
          setErrorMessage={setErrorMessage}
          setCost={setCost}
          setDescription={setDescription}
        />
      ))}

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
                  onChange={(e) => setDescription(e.target.value)}
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
                <p style={{ color: "red" }}>{errorMessage}</p>
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
