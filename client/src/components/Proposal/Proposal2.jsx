import React from "react";

const Proposal2 = ({cost, desciption, votes}) => {
  return (
    <div className="col-md-4">
      <div className="box approved">
        <p className="box-description">{desciption}</p>
        <p>
          <strong>Cost:</strong> ${cost}
        </p>
        <div className="d-flex align-items-center">
          <button className="btn btn-warning mt-2">
            <i className="bi bi-star"></i> Edit
          </button>
          <p className="ml-3 mb-0 pb-0">vote: {votes}</p>
        </div>
      </div>
    </div>
  );
};

export default Proposal2;
