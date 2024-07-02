"use strict";

import VoteDAO from "../dao/vote.dao.mjs";

class VoteController {
  constructor() {
    this.dao = new VoteDAO;
  }

  async increaseScore(user, proposal, rating) {
    return this.dao.increaseScore(user, proposal, rating);
  }

  async removeScore(user, proposal) {
    return this.dao.removeScore(user, proposal);
  }
}

export default VoteController;
