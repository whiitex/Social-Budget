import handleInvalidResponse from "./utils.mjs";

const SERVER_URL = "http://localhost:3001/socialbudget/api/votes";

/**
 * Get the score of all proposals
 */
const getScore = async () => {
  return await fetch(SERVER_URL + "/", {
    method: "GET",
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

/**
 * Increase the score of a proposal
 * It requires the user to be logged in.
 * The proposal id and the rating are sent in the request body.
 * - id: number
 * - rating: number
 */
const insertVote = async (proposal, rating) => {
  return await fetch(SERVER_URL + "/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ proposal, rating }),
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

/**
 * Remove the score of a proposal
 * It requires the user to be logged in.
 * The proposal id is sent in the request body.
 *  - id: number
 */
const removeScore = async (id) => {
  return await fetch(SERVER_URL + "/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

const VoteAPI = {
  getScore,
  insertVote,
  removeScore,
};
export default VoteAPI;
