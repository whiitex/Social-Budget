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
          else if (phase !== 3) resolve(true);
          // update the proposals according to the budget
          else {
            // get all proposals
            const sqlPropScore = `SELECT id, cost, SUM(score) as totscore
              FROM votes, proposals
              WHERE votes.proposal_id = proposals.id
              GROUP BY proposals.id`;
            db.all(sqlPropScore, [], (err, rows) => {
              if (err) reject(err);
              else {
                // sort proposals by score decreasing
                let proposals = rows.sort((a, b) => b.totscore - a.totscore);
                const sqlGetBudget = "SELECT * FROM state";
                db.get(sqlGetBudget, [], (err, row) => {
                  if (err) reject(err);
                  else {
                    // set to approved all proposals that fit the budget (cumulative sum)
                    let budget = row.budget;
                    let i = 0;
                    while (budget > proposals[i].cost && i < proposals.length) {
                      proposals[i].approved = true;
                      budget -= proposals[i].cost;
                      i++;
                    }
                    // update the proposals
                    for (const proposal of proposals) {
                      const sqlUpdate = `UPDATE proposals SET isapproved = ? WHERE id = ?`;
                      db.run(
                        sqlUpdate,
                        [proposal.approved ? true : false, proposal.id],
                        (err) => {
                          if (err) reject(err);
                        }
                      );
                    }
                  }
                });
              }
            });
          }
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
      let promises = [];
      // restore all tables
      const tables = ["proposals", "state", "votes"];
      for (const table of tables) {
        promises.push(
          new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${table}`;
            db.run(sql, [], (err) => {
              if (err) reject(err);
              else resolve(true);
            });
          })
        );
      }

      Promise.all(promises)
        // init state 0
        .then(() => {
          const sql = `INSERT INTO state (phase, budget) VALUES (0, 0)`;
          db.run(sql, [], (err) => {
            if (err) reject(err);
            else resolve(true);
          });
        })
        .catch((err) => reject(err));
    });
  }
}

export default PhaseDAO;
