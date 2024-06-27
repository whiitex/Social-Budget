"use strict";

import db from "../db/db.mjs";

class voteDAO {
  /**
   * Increases the score of a proposal.
   * @param proposal
   * @param rating range [1,3]
   * @returns
   */
  async insertScore(user, proposal, rating) {
    return new Promise((resolve, reject) => {
      // checks if the user is the same of the proposal author
      if (user.username === proposal.author)
        reject(new Error("User cannot vote for his own proposal"));
      // user is not the author of the proposal
      else {
        // checks if the user has already voted for the proposal
        const sqlCheck = `SELECT * FROM votes WHERE proposal_id = ? AND voter = ?`;
        db.get(sqlCheck, [proposal.id, user.username], (err, row) => {
          if (err) reject(err);
          // update the vote of the user
          else if (row) {
            const sql = `UPDATE votes SET rating = ? WHERE proposal_id = ? AND voter = ?`;
            db.run(sql, [rating, proposal.id, user.username], (err) => {
              if (err) reject(err);
              else resolve(true);
            });
          }
          // insert a new vote
          else {
            const sql = `INSERT INTO votes (proposal_id, voter, rating) VALUES (?, ?, ?)`;
            db.run(sql, [proposal.id, user.username, rating], (err) => {
              if (err) reject(err);
              else resolve(true);
            });
          }
        });
      }
    });
  }

  /**
   * Removes a user's score of a proposal.
   * @param proposal
   */
  async removeScore(user, proposal) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM votes WHERE proposal_id = ? AND voter = ?`;
      db.run(sql, [proposal.id, user.username], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

export default voteDAO;
