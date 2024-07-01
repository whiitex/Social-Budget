import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Proposal1 from "../Proposal/Proposal1";
import "bootstrap-icons/font/bootstrap-icons.css";


const Phase1 = () => {
  const [proposals, setProposals] = useState([1,2,3]);

  return (
    <div id="proposals" className="row mb-5">
      {proposals.map((proposal, index) => (
        <Proposal1 key={index} cost={100} description={"sample description"} />
      ))}

      {/* Form for inserting a new proposal */}
      <Container className="mt-4 pt-5">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-10 col-md-9 col-lg-7">
            <h3>Insert new proposal</h3>
            <Form>
              <Form.Group>
                <label className="mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="form-control inputText"
                  id="description"
                  rows="3"
                  placeholder="Enter description"
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
                    />
                  </div>
                  <div className="d-flex flex-column ml-3 justify-content-center mt-4">
                    <button type="button" className="plain-button p-1 m-0">
                      <i
                        className="btn-light bi bi-chevron-compact-up m-0 p-1"
                        style={{ fontSize: "1.4em" }}
                      ></i>
                    </button>
                    <button type="button" className="plain-button p-1 m-0">
                      <i
                        className="btn-light bi bi-chevron-compact-down m-0 p-1"
                        style={{ fontSize: "1.4em" }}
                      ></i>
                    </button>
                  </div>
                </div>
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
