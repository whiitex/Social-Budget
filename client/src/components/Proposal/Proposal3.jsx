import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Proposal3 = ({ isapproved, description, cost, score, author }) => {
  return (
    <div className="col-md-4">
      <div className={"box" + (isapproved ? " approved" : "")}>
        <i className="bi bi-file-check verified-icon mr-2 mt-2"></i>
        <h4># 1</h4>
        <p className="box-description">{description}</p>
        <p>
          <strong>Cost:</strong> ${cost}
        </p>
        <p>
          <strong>Score:</strong> {score}
        </p>
        {isapproved && (
          <p className="mb-1">
            <strong>Author:</strong> {author}
          </p>
        )}
      </div>
    </div>
  );
};

export default Proposal3;
