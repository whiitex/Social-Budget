"use strict";

import express from "express";
import cors from "cors";
import initRoutes from "./src/routes.mjs";

// init express
const app = express();

// CORS options
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "http://localhost:5177",
      "http://localhost:5178",
      "http://localhost:5179",
      "http://localhost:5180",
    ],
    credentials: true,
  })
);

initRoutes(app);

// activate the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
