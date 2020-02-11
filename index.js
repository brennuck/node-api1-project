const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send({ Welcome: "User!" })
})

const port = 1234;
server.listen(port, () => {
    console.log(`api running on port: ${port}`);
})