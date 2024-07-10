"use strict";

import db from "../db/db.mjs";

const GP = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM state`;
    db.get(sql, [], (err, row) => {
      if (err) reject(err);
      // if no state in db, init state 0, budget 0I
      else if (!row) resolve({ phase: 0, budget: 0 });
      else resolve(row);
    });
  });
};

export default GP;
