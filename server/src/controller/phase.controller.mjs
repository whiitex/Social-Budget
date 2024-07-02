"use strict";

import PhaseDAO from "../dao/phase.dao.mjs";

class PhaseController {
  constructor() {
    this.dao = new PhaseDAO();
  }

  async getPhase() {
    return this.dao.getPhase();
  }

  async updatePhase(phase, budget = null) {
    return this.dao.updatePhase(phase, budget);
  }

  async resetAll() {
    return this.dao.resetAll();
  }
}

export default PhaseController;
