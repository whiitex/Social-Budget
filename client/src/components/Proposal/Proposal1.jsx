import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProposalAPI from "../../API/proposal.api.mjs";

const Proposal1 = ({
  id,
  cost,
  description,
  setShouldRefresh,
  setErrorMessage,
  setCost,
  setDescription,
}) => {
  const handleDelete = (e) => {
    ProposalAPI.removeProposal({ id: id })
      .then(() => setShouldRefresh(true))
      .catch((err) => setErrorMessage(err.message));
  };

  const handleEdit = (e) => {
    const description =
      e.target.parentElement.parentElement.children[0].innerText;
    const cost =
      e.target.parentElement.parentElement.children[1].innerText.split("$")[1];

    ProposalAPI.removeProposal({ id: id })
      .then(() => {
        setShouldRefresh(true);
        // description update
        e.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[1].children[0].children[1].value =
          description;
        setDescription(description);

        // // cost update
        e.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[1].children[1].children[0].children[0].children[1].value =
          cost;
        setCost(cost);
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div className="col-md-4">
      <div className="box approved">
        <p className="box-description">{description}</p>
        <p>
          <strong>Cost:</strong> ${cost}
        </p>
        <div className="d-flex justify-content-around align-items-center">
          <Button onClick={handleEdit} className="btn-warning mt-2">
            <i className="bi bi-pencil"></i> Edit proposal
          </Button>
          <Button onClick={handleDelete} className="btn-danger mt-2 ml-2">
            <i className="bi bi-trash3"></i> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Proposal1;
