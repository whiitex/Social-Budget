"use strict";

import db from "../db/db.mjs";

class PhaseDAO {
  /**
   * Get the current phase
   * @returns the current phase
   */
  async getPhase() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM state`;
      db.get(sql, [], (err, row) => {
        if (err) reject(err);
        else if (!row) resolve({ error: "No phase found" });
        else resolve(row);
      });
    });
  }

  /**
   * Update the phase
   * @param phase
   * @param budget
   * @returns tre\ue if the phase is updated
   */
  async updatePhase(phase, budget = null) {
    return new Promise((resolve, reject) => {
      // only update the phase
      if (!budget) {
        const sql = `UPDATE state SET phase = ?`;
        db.run(sql, [phase], (err) => {
          if (err) reject(err);
          else resolve(true);
        });
        // update the phase and the budget
      } else {
        const sql = `UPDATE state SET phase = ?, budget = ?`;
        db.run(sql, [phase, budget], (err) => {
          if (err) reject(err);
          else resolve(true);
        });
      }
    });
  }

  /**
   * Reset all tables (proposals, state, votes)
   * @returns true if all tables are reset
   */
  async resetAll() {
    return new Promise((resolve, reject) => {
      let promise = [];
      const tables = ["proposals", "state", "votes"];
      for (const table of tables) {
        promise.push(
          new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${table}`;
            db.run(sql, [], (err) => {
              if (err) reject(err);
              else resolve(true);
            });
          })
        );
      }
      Promise.all(promise)
        .then(() => resolve(true))
        .catch((err) => reject(err));
    });
  }
}

export default PhaseDAO;
