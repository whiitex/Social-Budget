import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Proposal3 = ({ proposal, order }) => {
  return (
    <div className="col-md-4 col-sm-6 col-6">
      <div className={"box" + (proposal.isapproved ? " approved" : "")}>
        <i className="bi bi-file-check verified-icon mr-2 mt-2"></i>
        <h4># {order}</h4>
        <p className="box-description">{proposal.description}</p>
        <p>
          <strong>Cost:</strong> ${proposal.cost}
        </p>
        <p>
          <strong>Score:</strong> {proposal.score}
        </p>
        {proposal.isapproved && (
          <p className="mb-1">
            <strong>Author:</strong> {proposal.author}
          </p>
        )}
      </div>
    </div>
  );
};

export default Proposal3;
