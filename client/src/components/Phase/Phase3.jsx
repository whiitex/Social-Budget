import React from "react";
import Proposal3 from "../Proposal/Proposal3";

const Phase3 = ({ proposals, budget }) => {
  // handle proposals and ranking
  return (
    <>
      {/* Approved */}
      <div id="final" className="row mb-5">
        {proposals.map((proposal) => (
          <Proposal3
            key={proposal.id}
            isapproved={proposal.isapproved}
            description={proposal.description}
            cost={proposal.cost}
            score={proposal.score}
            author={proposal.author}
          />
        ))}
      </div>

      {/* Non approved */}
      <div id="final" className="row mb-5">
        {proposals.map((proposal) => (
          <Proposal3
            key={proposal.id}
            isapproved={proposal.isapproved}
            description={proposal.description}
            cost={proposal.cost}
            score={proposal.score}
            author={proposal.author}
          />
        ))}
      </div>
    </>
  );
};

export default Phase3;
