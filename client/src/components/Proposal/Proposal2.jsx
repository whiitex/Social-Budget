import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import VoteAPI from "../../API/vote.api.mjs";

const Proposal2 = ({ proposal, votes, setShouldRefresh, mine }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [changeVote, setChangeVote] = useState(false);
  const [newVote, setNewVote] = useState(0);

  const handleChangeVote = (e) => {
    e.preventDefault();
    const vote = parseInt(e.target.value);
    if (
      vote !== 0 &&
      vote !== 1 &&
      vote !== 2 &&
      vote !== 3 &&
      e.target.value !== ""
    ) {
      setErrorMessage("Vote must be an integer x ≤ 3");
      return;
    } else {
      setErrorMessage("");
      setNewVote(vote);
    }
  };

  const handleSubmit = (score) => (e) => {
    e.preventDefault();

    if (errorMessage !== "") return;
    setChangeVote(false);

    VoteAPI.insertVote(proposal, score || 0)
      .then(() => setShouldRefresh(true))
      .catch((err) => setErrorMessage(err.message ? err.message : err));
  };

  return (
    <div className="col-md-4 col-sm-6 col-6">
      <div className={"box" + (mine ? "" : " approved")}>
        <p className="box-description">{proposal.description}</p>
        <p>
          <strong>Cost:</strong> ${proposal.cost}
        </p>
        {errorMessage !== "" ? (
          <Form.Group className="mb-0">
            <p style={{ color: "red" }} className="mb-0">
              {errorMessage}
            </p>
          </Form.Group>
        ) : (
          <></>
        )}
        <div className="d-flex align-items-center">
          {mine ? (
            <></>
          ) : (
            <Button
              onClick={() => {
                setChangeVote(!changeVote);
                setNewVote(0);
                setErrorMessage("");
              }}
              className="btn-warning mt-2 mb-2"
            >
              <i className="bi bi-star" /> Edit
            </Button>
          )}
          {changeVote && !mine ? (
            <Form onSubmit={handleSubmit(newVote)} className="row ml-0 mt-1">
              <Form.Group className="ml-3 mb-2" id="insertVoteInput">
                <input
                  className="form-control inputText"
                  id="description"
                  rows="3"
                  onChange={handleChangeVote}
                  autoFocus
                ></input>
              </Form.Group>
              <Button type="submit" className="btn-danger ml-3 mb-2">
                Vote!
              </Button>
            </Form>
          ) : !mine ? (
            <p className="ml-3 mb-0 pb-0">vote: {votes}</p>
          ) : (
            <></>
          )}

          {!changeVote && !mine ? (
            <Button
              onClick={handleSubmit(0)}
              style={{ width: "4em" }}
              className="btn-danger ml-3 mt-2 mb-2"
            >
              <i className="bi bi-trash" />
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proposal2;
