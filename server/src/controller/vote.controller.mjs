"use strict";

import VoteDAO from "../dao/vote.dao.mjs";

class VoteController {
  constructor() {
    this.dao = new VoteDAO();
  }

  async getScore() {
    return this.dao.getScore();
  }

  async insertScore(user, proposal, rating) {
    return this.dao.insertScore(user, proposal, rating);
  }

  async removeScore(user, proposal) {
    return this.dao.removeScore(user, proposal);
  }
}

export default VoteController;
