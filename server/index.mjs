"use strict";

import express from "express";
import { Server } from "socket.io";
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
    ],
    credentials: true,
  })
);

initRoutes(app);

// activate the server
const PORT = 3001;

const listenCallback = () => {
  console.log(`Server listening at http://localhost:${PORT}`);
};

const io = new Server(app.listen(PORT, listenCallback), {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("phase", (phase) => {
    console.log("Phase from admin: ", phase);
    io.emit("phase", phase);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export default app;
