import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const Proposal1 = ({ cost, description }) => {
  return (
    <div className="col-md-4">
      <div className="box approved">
        <p className="box-description">{description}</p>
        <p>
          <strong>Cost:</strong> ${cost}
        </p>
        <div className="d-flex justify-content-around align-items-center">
          <Button className="btn-warning mt-2">
            <i className="bi bi-pencil"></i> Edit proposal
          </Button>
          <Button className="btn-danger mt-2 ml-2">
            <i className="bi bi-trash3"></i> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Proposal1;
