"use strict";

import UserDAO from "./src/dao/user.dao.mjs";

class UserController {
  constructor() {
    this.dao = new UserDAO();
  }

  async getUserByUsername(username) {
    return this.dao.getUserByUsername(username);
  }
  
  async getUserByCredentials(username, password) {
    return this.dao.getUserByCredentials(username, password);
  }
}

export default UserController;
