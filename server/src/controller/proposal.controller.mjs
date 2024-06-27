"use strict";

import ProposalDAO from "./src/dao/proposal.dao.mjs";

class ProposalController {
  constructor() {
    this.dao = new ProposalDAO();
  }

  async getApprovedProposals() {
    return this.dao.getApprovedProposals();
  }

  async getProposals() {
    return this.dao.getProposals();
  }

  async insertProposal(proposal) {
    return this.dao.insertProposal(proposal);
  }

  async removeProposal(proposal) {
    return this.dao.removeProposal(proposal);
  }

  async removeAllProposals() {
    return this.dao.removeAllProposals();
  }

  async increaseScore(proposal, rating) {
    return this.dao.increaseScore(proposal, rating);
  }
}

export default ProposalController;
