"use strict";

import ProposalDAO from "../dao/proposal.dao.mjs";

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

  async insertProposal(user, proposal) {
    return this.dao.insertProposal(user, proposal);
  }

  async removeProposal(proposal) {
    return this.dao.removeProposal(proposal);
  }

  async removeAllProposals() {
    return this.dao.removeAllProposals();
  }

  async increaseScore(user, proposal, rating) {
    return this.dao.increaseScore(user, proposal, rating);
  }
}

export default ProposalController;
