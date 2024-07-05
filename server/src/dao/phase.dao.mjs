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
        // if no state in db, init state 0, budget 0I
        else if (!row) resolve({ phase: 0, budget: 0 });
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
            const sqlPropScore = `SELECT proposals.id, cost, SUM(votes.score) as totscore
              FROM proposals LEFT JOIN votes 
              ON votes.proposal_id = proposals.id
              GROUP BY proposals.id`;
            db.all(sqlPropScore, [], (err, rows) => {
              if (err) reject(err);
              else if (rows.length === 0) resolve(true);
              else {
                // sort proposals by score decreasing
                let proposals = rows.sort((a, b) => {
                  if (a.totscore !== b.totscore) return b.totscore - a.totscore;
                  else return a.cost - b.cost;
                });
                const sqlGetBudget = "SELECT * FROM state";
                db.get(sqlGetBudget, [], (err, row) => {
                  if (err) reject(err);
                  else {
                    // set to approved all proposals that fit the budget (cumulative sum)
                    let budget = row.budget;
                    let i = 0;
                    while (
                      i < proposals.length &&
                      budget >= proposals[i].cost &&
                      proposals[i].totscore
                    ) {
                      proposals[i].approved = true;
                      budget -= proposals[i].cost;
                      i++;
                    }

                    // update the proposals
                    for (const proposal of proposals) {
                      const sqlUpdate = `UPDATE proposals SET isapproved = ?, score = ? WHERE id = ?`;
                      db.run(
                        sqlUpdate,
                        [
                          proposal.approved ? true : false,
                          proposal.totscore,
                          proposal.id,
                        ],
                        (err) => {
                          if (err) reject(err);
                          else resolve(true);
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
        const sqlDeleteAll = "DELETE FROM state";
        db.run(sqlDeleteAll, [], (err) => {
          if (err) reject(err);
          else {
            const sql = `INSERT INTO state (phase, budget) VALUES (?, ?)  `;
            db.run(sql, [phase, budget], (err) => {
              if (err) reject(err);
              else resolve(true);
            });
          }
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
