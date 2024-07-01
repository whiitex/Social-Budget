import React from "react";
import Proposal2 from "../Proposal/Proposal2";

const Phase2 = ({ proposals }) => {
  return (
    <>
      {proposals.length === 0 ? (
        <h3 className="text-center mt-5">No proposals...</h3>
      ) : (
        <div id="preference" className="row mb-5">
          {proposals.map((proposal, index) => (
            <Proposal2 key={index} desciption="ciao" cost={111} votes={1} />
          ))}
        </div>
      )}
    </>
  );
};

export default Phase2;
