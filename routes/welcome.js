// REGISTER /GET /POST
const express = require("express");
const { DatabaseError } = require("pg");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.userID) {
      return res.redirect("/index");
    }
    return res.render("welcome");
  });

  router.post("/register", (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    const newEmail = user.email;
    const newPassword = user.password;
    console.log(newPassword);
    db.query(`SELECT * FROM users WHERE email = $1;`, [newEmail]).then(
      (result) => {
        if (result.rows.length > 0) {
          return res
            .status(400)
            .send(
              "Email already exists in the database, please <a href='/'>login</a>"
            );
        } else {
          db.query(
            `INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *;`,
            [newEmail, newPassword]
          )
            .then(() => {
              return res.send("You have registered successfully. Please Sign in now.");
            })
            .catch((err) => {
              console.log(err);
            });
        };
      }
    );
  });
  //////////
  const getUserWithEmail = function(email) {
    return db
      .query(`SELECT * FROM users WHERE users.email = $1;`, [email])
      .then((result) => {
        console.log("e");
        if (!result) {
          return null;
        }
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  exports.getUserWithEmail = getUserWithEmail;

  const login = function(email, password) {
    return getUserWithEmail(email).then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  };
  exports.login = login;
  /////////
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then((user) => {
        if (!user) {
          console.log("a");
          res
            .status(400)
            .send("Invalid login, please <a href='/'>try again</a>");
          return;
        }
        console.log("b");
        req.session.userID = user.id;
        req.session.userEmail = user.email;
        return res.redirect("/index");
      })
      .catch((e) => {
        console.log("c");
        res
          .status(400)
          .send(
            "Please include a valid email/password, please <a href='/'>try again</a>"
          );
        return;
      });
  });
  return router;
};
