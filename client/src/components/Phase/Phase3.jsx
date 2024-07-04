import React from "react";
import Proposal3 from "../Proposal/Proposal3";

const Phase3 = ({ proposals, budget, user }) => {
  // handle proposals and ranking
  return (
    <>
      {/* Approved */}
      <div id="final" className="row mb-2">
        <h3 className="text-center mt-5">Approved proposals</h3>
      </div>
      <div id="final" className="row mb-5">
        {proposals
          .filter((p) => p.isapproved)
          .map((proposal, index) => (
            <Proposal3
              key={proposal.id}
              proposal={proposal}
              order={index + 1}
            />
          ))}
      </div>

      {/* Non approved */}
      {user ? (
        <>
          <div id="final" className="row mb-2">
            <h3 className="text-center mt-5">Non approved proposals</h3>
          </div>
          <div id="final" className="row mb-5">
            {proposals
              .filter((p) => !p.isapproved)
              .map((proposal, index) => (
                <Proposal3
                  key={proposal.id}
                  proposal={proposal}
                  order={
                    index + 1 + proposals.filter((p) => p.isapproved).length
                  }
                />
              ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Phase3;
