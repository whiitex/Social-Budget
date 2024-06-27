"use strict";

import express from "express";
import ProposalController from "../controller/proposal.controller.mjs";

class ProposalRoutes {
  constructor(authenticator) {
    this.authenticator = authenticator;
    this.router = new express.Router();
    this.proposalController = new ProposalController();
    this.initRoutes();
  }

  getRouter() {
    return this.router;
  }

  initRoutes() {
    /**
     * Get all approved proposals
     * It does NOT require the user to be logged in.
     */
    this.router.get("/approved", (req, res, next) => {
      this.proposalController
        .getApprovedProposals()
        .then((proposals) => res.status(200).json(proposals))
        .catch((err) => next(err));
    });

    /**
     * Get all proposals
     * It requires the user to be logged in.
     */
    this.router.get("/", this.authenticator.isLoggedIn, (req, res, next) => {
      this.proposalController
        .getProposals()
        .then((proposals) => res.status(200).json(proposals))
        .catch((err) => next(err));
    });

    /**
     * Insert a proposal
     * It requires the user to be logged in.
     * The proposal is sent in the request body.
     *  - description: string,
     *  - cost: number
     */
    this.router.post("/", this.authenticator.isLoggedIn, (req, res, next) => {
      this.proposalController
        .insertProposal(req.user, req.body)
        .then((proposal) => res.status(200).json(proposal))
        .catch((err) => next(err));
    });

    /**
     * Remove a proposal
     * It requires the user to be logged in.
     * The proposal is sent in the request body.
     *   - id: number
     *   - author: string
     *   - description: string
     *   - cost: number
     *   - score: number
     *   - is_approved: boolean
     */
    this.router.delete("/", this.authenticator.isLoggedIn, (req, res, next) => {
      this.proposalController
        .removeProposal(req.body)
        .then((proposal) => res.status(200).json(proposal))
        .catch((err) => next(err));
    });

    /**
     * Remove all proposals
     * It requires the user to be logged in and to be admin.
     */
    this.router.delete("/all", this.authenticator.isAdmin, (req, res, next) => {
      this.proposalController
        .removeAllProposals()
        .then((ok) => res.status(200).json(ok))
        .catch((err) => next(err));
    });

    /**
     * Increase the score of a proposal
     * It requires the user to be logged in.
     * The proposal is sent in the request body.
     *   - id: number
     *   - author: string
     *   - description: string
     *   - cost: number
     *   - score: number
     *   - is_approved: boolean
     */
    this.router.put(
      "/score",
      this.authenticator.isLoggedIn,
      (req, res, next) => {
        this.proposalController
          .increaseScore(req.body, req.query.rating)
          .then((proposal) => res.status(200).json(proposal))
          .catch((err) => next(err));
      }
    );
  }
}

export default ProposalRoutes;
