const express = require("express");

const server = express();

const StudentsRouter = require("../students/students-router");

server.use(express.json());

server.use("/api", StudentsRouter);

module.exports = server;