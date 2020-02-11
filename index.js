const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send({ Welcome: "User!" });
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({
          errorMessage: "The users information could not be retrieved."
        });
    });
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    Users.findById(id)
    .then(users => {
        if (!users) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(users)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    })
})

const port = 1234;
server.listen(port, () => {
  console.log(`api running on port: ${port}`);
});
