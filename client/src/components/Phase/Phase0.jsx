import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import DigitalButtons from "../Utility/DigitalButtons";
import "bootstrap-icons/font/bootstrap-icons.css";

const Phase0 = () => {
  return (
    <div id="budget" className="row mb-5">
      {/* Form for inserting budget amound */}
      <Container className="mt-4 pt-5 d-flex justify-content-center">
        <div id="budget-definition" className="col-11 col-sm-11 col-md-10 col-lg-8">
          <h3>Define budget amount</h3>

          <form className="mt-4">
            <Form.Group className="row">
              <div className="col-8 d-flex align-items-center">
                <Form.Control
                  type="text"
                  className="inputText"
                  placeholder="Enter value"
                />
                <DigitalButtons margintop="mt-0" />
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
