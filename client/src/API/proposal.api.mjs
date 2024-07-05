"use strict";

import handleInvalidResponse from "./utils.mjs";

const SERVER_URL = "http://localhost:3001/socialbudget/api/proposals";

/**
 * Get all approved proposals
 */
const getApprovedProposals = async () => {
  return await fetch(SERVER_URL + "/approved", {
    method: "GET",
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

/**
 * Get all proposals
 * It requires the user to be logged in.
 */
const getAllProposals = async () => {
  return await fetch(SERVER_URL + "/", {
    method: "GET",
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

/**
 * Insert a proposal
 * It requires the user to be logged in.
 * @param {description, cost} proposal
 */
const insertProposal = async (proposal) => {
  const response = await fetch(SERVER_URL + "/", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proposal),
  });
  if (!response.ok) {
    const error = await response.json();
    if (error.message) throw error;
    else throw { message: "Something went wrong" };
  } else {
    return response;
  }
};

/**
 * Edit a proposal
 * It requires the user to be logged in.
 * @param {id, description, cost} proposal
 */
const editProposal = async (proposal) => {
  return await fetch(SERVER_URL + "/edit", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proposal),
  });
};

/**
 * Remove a proposal
 * It requires the user to be logged in.
 * @param {id} proposal
 */
const removeProposal = async (proposal) => {
  return await fetch(SERVER_URL + "/", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proposal),
  });
};

/**
 * Remove all proposals
 * It requires the user to be admin.
 */
const removeAllProposals = async () => {
  return await fetch(SERVER_URL + "/all", {
    method: "DELETE",
    credentials: "include",
  });
};

const ProposalAPI = {
  getApprovedProposals,
  getAllProposals,
  insertProposal,
  editProposal,
  removeProposal,
  removeAllProposals,
};
export default ProposalAPI;
