"use strict";

import db from "../db/db.mjs";
import GP from "./utils.dao.mjs";

class ProposalDAO {
  /**
   * Callable by all users, anonymous or logged in.
   * @returns all approved proposals
   */
  async getApprovedProposals() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM proposals WHERE isapproved = 1`;
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  /**
   * Callable only by logged in users.
   * @returns all proposals if phase is 3, otherwise returns only the proposals of the user.
   */
  async getProposals(user) {
    return new Promise((resolve, reject) => {
      const sqlPhase = `SELECT * FROM state`;
      db.get(sqlPhase, [], (err, row) => {
        if (err) reject(err);
        else {
          // not the final phase
          if (!row || row.phase < 2) {
            const sql = `SELECT * FROM proposals WHERE author = ?`;
            db.all(sql, [user.username], (err, rows) => {
              if (err) reject(err);
              else resolve(rows);
            });
            // final phase
          } else {
            const sql = `SELECT * FROM proposals ORDER BY score DESC, cost ASC`;
            db.all(sql, [], (err, rows) => {
              if (err) reject(err);
              else resolve(rows);
            });
          }
        }
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
    return new Promise(async (resolve, reject) => {
      // check if it is the first phase
      const phase = await GP();
      if (phase.phase !== 1) reject(new Error("Not in phase 1"));
      else {
        // check if the user has already submitted 3 proposals
        const sqlCheck = `SELECT * FROM proposals WHERE author = ?`;
        db.all(sqlCheck, [user.username], (err, rows) => {
          if (err) reject(err);
          // user can submit a proposal
          else if (!rows || rows.length < 3) {
            const sql = `INSERT INTO proposals (author, description, cost)VALUES (?, ?, ?)`;
            db.run(
              sql,
              [user.username, proposal.description, proposal.cost || 0],
              (err) => {
                if (err) reject(err);
                else resolve(true);
              }
            );
            // user has already submitted 3 proposals
          } else reject(new Error("You have already submitted 3 proposals"));
        });
      }
    });
  }

  /**
   * Edits a proposal in the proposals table.
   * @param user - The user who is editing the proposal.
   * @param proposal - The proposal to be edited.
   */
  async editProposal(user, proposal) {
    return new Promise(async (resolve, reject) => {
      // check if it is the first phase
      const phase = await GP();
      if (phase.phase !== 1) reject(new Error("Not in phase 1"));
      else {
        // check if the user is the author of the proposal
        const sqlCheck = `SELECT * FROM proposals WHERE id = ?`;
        db.get(sqlCheck, [proposal.id], (err, row) => {
          if (err) reject(err);
          else if (!row) reject(new Error("Proposal not found"));
          else if (user.username !== row.author)
            reject(new Error("User cannot edit another user's proposal"));
          else {
            const sql = `UPDATE proposals SET description = ?, cost = ? WHERE id = ?`;
            db.run(
              sql,
              [proposal.description, proposal.cost, proposal.id],
              (err) => {
                if (err) reject(err);
                else resolve(true);
              }
            );
          }
        });
      }
    });
  }

  /**
   * Removes a proposal from the proposals table.
   * @param proposal
   * @returns true if no error occurs
   */
  async removeProposal(proposal) {
    return new Promise(async (resolve, reject) => {
      // check if it is the first phase
      const phase = await GP();
      if (phase.phase !== 1) reject(new Error("Not in phase 1"));
      else {
        const sql = `DELETE FROM proposals WHERE id = ?`;
        db.run(sql, [proposal.id], (err) => {
          if (err) reject(err);
          else resolve(true);
        });
      }
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
}

export default ProposalDAO;
