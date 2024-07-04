import React, { useState, useEffect } from "react";
import Proposal2 from "../Proposal/Proposal2";
import VoteAPI from "../../API/vote.api.mjs";

const Phase2 = ({ proposals, user }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    setShouldRefresh(false);
    VoteAPI.getScore()
      .then((votes) => {
        setVotes(votes.filter((vote) => vote.voter === user.username));
      })
      .catch((err) => console.error(err));
  }, [shouldRefresh]);

  return (
    <>
      {proposals.filter((proposal) => proposal.author !== user.username)
        .length === 0 ? (
        <h3 className="text-center mt-5">No proposals...</h3>
      ) : (
        <>
          <div id="preference" className="row mb-2">
            <h3 className="text-center mt-5">Vote proposals</h3>
          </div>
          <div id="preference" className="row mb-5">
            {proposals
              .filter((proposal) => proposal.author !== user.username)
              .map((proposal) => {
                let vote = votes.filter(
                  (vote) => vote.proposal_id === proposal.id
                );
                if (vote.length === 0) vote = 0;
                else vote = vote[0].score;
                return (
                  <Proposal2
                    key={proposal.id}
                    proposal={proposal}
                    votes={vote}
                    mine={false}
                    setShouldRefresh={setShouldRefresh}
                  />
                );
              })}
          </div>
        </>
      )}
      {proposals.filter((proposal) => proposal.author === user.username)
        .length === 0 ? (
        <> </>
      ) : (
        <>
          <div id="preference" className="row mb-2">
            <h3 className="text-center mt-5">My proposals</h3>
          </div>
          <div id="preference" className="row mb-5">
            {proposals
              .filter((proposal) => proposal.author === user.username)
              .map((proposal) => (
                <Proposal2
                  key={proposal.id}
                  proposal={proposal}
                  votes={0}
                  mine={true}
                  setShouldRefresh={setShouldRefresh}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Phase2;
