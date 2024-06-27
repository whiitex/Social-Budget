"use strict";

import express from "express";
import cors from "cors";
import initRoutes from "./src/routes.mjs";

// init express
const app = express();
const port = 3001;

// CORS options
app.use(cors());


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;