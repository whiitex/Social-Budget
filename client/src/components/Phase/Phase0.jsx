import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const Phase0 = () => {
  return (
    <div id="budget" className="row mb-5">
      {/* Form for inserting budget amound */}
      <Container className="mt-4 pt-5 d-flex justify-content-center">
        <div id="budget-definition" class="col-11 col-sm-11 col-md-10 col-lg-8">
          <h3>Define budget amount</h3>

          <form className="mt-4">
            <Form.Group className="row">
              <div className="col-8 d-flex align-items-center">
                <Form.Control
                  type="text"
                  className="inputText"
                  placeholder="Enter value"
                />
                <div className="d-flex flex-column ml-3 justify-content-center">
                  <button type="button" className="plain-button p-1 m-0">
                    <i
                      className="btn-light bi bi-chevron-compact-up m-0 p-1"
                      style={{ fontSize: "1.4em" }}
                    />
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
