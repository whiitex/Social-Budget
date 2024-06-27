"use strict";

import express from "express";
import cors from "cors";
import initRoutes from "./src/routes.mjs";

// init express
const app = express();

// CORS options
app.use(cors());

initRoutes(app);

// activate the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;