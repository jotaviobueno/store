import express from "express";

const server = express();

const port = 3000;

// Database Connection
import "./database/mongodb/connection.js";

// Application Import
import Application from "./application.js";
Application(server, express);

// server listening
server.listen(process.env.PORT || port, () => {
	console.log(`Server listening on port: ${process.env.PORT || port}`);
});