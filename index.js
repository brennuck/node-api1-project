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
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(users => {
      if (!users) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const userData = req.body;

  Users.insert(userData)
    .then(user => {
      if (!userData.name || !userData.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        Users.insert(userData);
        res.status(201).json(user);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  Users.update(id, updates)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else if (!updates.name || !updates.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    });
});

const port = 1234;
server.listen(port, () => {
  console.log(`api running on port: ${port}`);
});
