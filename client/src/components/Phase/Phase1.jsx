import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Proposal1 from "../Proposal/Proposal1";
import DigitalButtons from "../Utility/DigitalButtons";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProposalAPI from "../../API/proposal.api.mjs";

const Phase1 = ({ user }) => {
  const [proposals, setProposals] = useState([]);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    ProposalAPI.getAllProposals()
      .then((propos) => {
        setErrorMessage("");
        setProposals(propos.filter((p) => p.author === user.username));
      })
      .catch((err) => setErrorMessage(err.message));
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const proposal = { description, cost };
    e.target.reset();
    setDescription("");
    setCost(0);

    ProposalAPI.insertProposal(proposal)
      .then(() => setProposals([...proposals, proposal]))
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div id="proposals" className="row mb-5">
      {proposals.map((proposal, index) => (
        <Proposal1
          key={index}
          cost={proposal.cost}
          description={proposal.description}
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
                      onChange={(e) => setCost(parseFloat(e.target.value))}
                    />
                  </div>
                  <DigitalButtons margintop="mt-4" />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <p style={{ color: "red" }}>{errorMessage}</p>
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Phase1;
