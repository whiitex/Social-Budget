"use strict";

import express from "express";
import morgan from "morgan";
import Authenticator from "./route/auth.route.mjs";
import ProposalRoutes from "./route/proposal.route.mjs";
import VoteRoutes from "./route/vote.route.mjs";
import PhaseRoutes from "./route/phase.route.mjs";

const prefix = "/socialbudget/api";

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
  const phaseRouter = new PhaseRoutes(authRoutes);

  app.use(`${prefix}/sessions`, authRoutes.getRouter());
  app.use(`${prefix}/proposals`, proposalRoutes.getRouter());
  app.use(`${prefix}/votes`, voteRoutes.getRouter());
  app.use(`${prefix}/phase`, phaseRouter.getRouter());
}

export default initRoutes;
