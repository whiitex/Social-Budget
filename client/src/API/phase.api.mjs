import handleInvalidResponse from "./utils.mjs";

const SERVER_URL = "http://localhost:3001/socialbudget/api/phase";

/**
 * Get the current phase
 * It does not require the user to be logged in.
 */
const getPhase = async () => {
  return await fetch(SERVER_URL + "/", {
    method: "GET",
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

/**
 * Update the phase
 * It requires the user to be admin.
 * The phase and the budget are sent in the request body.
 * - phase: integer
 * - budget: float || null
 */
const updatePhase = async (phase, budget = null) => {
  return await fetch(SERVER_URL + "/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ phase, budget }),
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

/**
 * Reset all tables (proposals, state, votes)
 * It requires the user to be admin.
 */
const resetAll = async () => {
  return await fetch(SERVER_URL + "/", {
    method: "DELETE",
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

const PhaseAPI = {
  getPhase,
  updatePhase,
  resetAll,
};
export default PhaseAPI;
