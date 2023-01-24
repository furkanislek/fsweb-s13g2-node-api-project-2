// implement your server here
// require your posts router and connect it here
const express = require("express");

const userRouter = require("./posts/posts-router");

const server = express();

server.use("/api/posts", userRouter);

module.exports = server;
