"use strict";

import db from "../db/db.mjs";

class ProposalDAO {
  /**
   * Callable by all users, anonymous or logged in.
   * @returns all approved proposals
   */
  async getApprovedProposals() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM proposals WHERE is_approved = 1`;
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  /**
   * Callable only by logged in users.
   * @returns all proposals
   */
  async getProposals() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM proposals`;
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  /**
   * Inserts a proposal into the proposals table.
   * @param user - The user who is submitting the proposal.
   * @param proposal - The proposal to be inserted.
   * @returns
   */
  async insertProposal(user, proposal) {
    return new Promise((resolve, reject) => {
      // check if the user has already submitted 3 proposals
      const sqlCheck = `SELECT * count FROM proposals WHERE author = ?`;
      db.all(sqlCheck, [user.username], (err, rows) => {
        if (err) reject(err);
        // user can submit a proposal
        else if (!rows || rows.length < 3) {
          const sql = `INSERT INTO proposals (author, description, cost, is_approved)VALUES (?, ?, ?, ?)`;
          db.run(
            sql,
            [user.username, proposal.description, proposal.cost, false],
            (err) => {
              if (err) reject(err);
              else resolve(true);
            }
          );
          // user has already submitted 3 proposals
        } else reject(new Error("User has already submitted 3 proposals"));
      });
    });
  }

  /**
   * Removes a proposal from the proposals table.
   * @param proposal
   * @returns true if no error occurs
   */
  async removeProposal(proposal) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM proposals WHERE id = ?`;
      db.run(sql, [proposal.id], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  /**
   * Remove all proposals from the proposals table.
   * @param proposal
   * @returns true if no error occurs
   */
  async removeAllProposals() {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM proposals`;
      db.run(sql, [], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

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
}

export default ProposalDAO;
