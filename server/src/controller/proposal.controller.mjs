"use strict";

import ProposalDAO from "../dao/proposal.dao.mjs";

class ProposalController {
  constructor() {
    this.dao = new ProposalDAO;
  }

  async getApprovedProposals() {
    return this.dao.getApprovedProposals();
  }

  async getProposals() {
    return this.dao.getProposals();
  }

  async insertProposal(user, proposal) {
    return new Promise((resolve, reject) => {
      this.dao.insertProposal(user, proposal)
      .then(() => resolve(true))
      .catch((err) => reject(err));
    })
    
  }

  async editProposal(user, proposal) {
    return this.dao.editProposal(user, proposal);
  }

  async removeProposal(proposal) {
    return this.dao.removeProposal(proposal);
  }

  async removeAllProposals() {
    return this.dao.removeAllProposals();
  }
}

export default ProposalController;
