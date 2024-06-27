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
   * @param proposal 
   * @returns 
   */
  async insertProposal(proposal) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO proposals (author, description, cost, score, is_approved)VALUES (?, ?, ?, ?, ?)`;
      db.run(
        sql,
        [
          proposal.author,
          proposal.description,
          proposal.cost,
          proposal.score,
          proposal.is_approved,
        ],
        (err) => {
          if (err) reject(err);
          else resolve(true);
        }
      );
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
  async increaseScore(proposal, rating) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE proposals SET score = score + ? WHERE id = ?`;
      db.run(sql, [rating, proposal.id], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

export default ProposalDAO;