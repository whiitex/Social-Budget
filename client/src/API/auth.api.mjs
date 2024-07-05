"use strict";

import handleInvalidResponse from "./utils.mjs";

const SERVER_URL = "http://localhost:3001/socialbudget/api/sessions";

/**
 * Log in the user - if credentials are correct
 * @param {username, password} credentials json contains the username and password
 * @returns the user if correctly logged in
 */
const login = async (credentials) => {
  return await fetch(SERVER_URL + "/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

/**
 * Get user information if correctly logged in
 * @returns the user if correctly logged in
 */
const getUserInfo = async () => {
  return await fetch(SERVER_URL + "/current", {
    method: "GET",
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

/**
 * Log out the user
 */
const logout = async () => {
  return await fetch(SERVER_URL + "/current", {
    method: "DELETE",
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((response) => response.json())
    .catch((err) => {});
};

const AuthAPI = {
  login,
  getUserInfo,
  logout,
};
export default AuthAPI;
