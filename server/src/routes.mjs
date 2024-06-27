"use strict";

import express from "express";
import morgan from "morgan";
import Authenticator from "./route/auth.route.mjs";
import ProposalRoutes from "./route/proposal.route.mjs";
import VoteRoutes from "./route/vote.route.mjs";

const prefix = "/socialbudget";

/**
 * Initializes the routes for the application.
 * @param app - The express application instance.
 */
function initRoutes(app) {
  app.use(morgan("dev")); // Log requests to the console
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb", extended: true }));

  const authRoutes = new Authenticator(app);
  const proposalRoutes = new ProposalRoutes(authRoutes);
  const voteRoutes = new VoteRoutes(authRoutes);

  app.use(`${prefix}/api/sessions`, authRoutes.getRouter());
  app.use(`${prefix}/api/proposals`, proposalRoutes.getRouter());
  app.use(`${prefix}/api/votes`, voteRoutes.getRouter());
}

export default initRoutes;
