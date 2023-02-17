// HOME PAGE /GET
const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const bcrypt = require("bcrypt");
const {catCount} = require("./helpers/categoryCount")

module.exports = () => {
  router.get("/", (req, res) => {
    if (!req.session.userID) {
      return res.redirect("/");
    }
    const userEmail = req.session.userEmail;
    db.query(
      `
    SELECT count(category), category
    FROM tasks
    WHERE user_id = $1
    GROUP BY user_id, category
    ;`, [req.session.userID])
    .then((results) => {
      const count = {
      one: results.rows[0],
      two: results.rows[1],
      three: results.rows[2],
      four: results.rows[3],
      five: results.rows[4]
      };
      const cats = catCount(count);
      return res.render("index", { userEmail, cats });
    });
  });

  router.post("/update", (req, res) => {
    const updatedEmail = req.body.email;
    const updatedPassword = bcrypt.hashSync(req.body.password, 10);
    const updatedId = req.session.userID;
    const originalEmail = req.session.userEmail;
    if (!updatedEmail || !updatedPassword) {
      return res
        .status(400)
        .send(
          "Please fill in email and password fields. <a href='/'>Try again</a>"
        );
    }
    db.query(`SELECT * FROM users WHERE users.id = $1;`, [updatedId])
      .then((result) => {
        return db.query(`SELECT * from users WHERE email = $1;`, [
          updatedEmail,
        ]);
      })
      .then((result) => {
        if (result.rows.length > 0 && updatedEmail !== originalEmail) {
          return res
            .status(400)
            .send("Please enter a different email <a href='/'>Try again</a>");
        } else {
          db.query(
            `
      UPDATE users SET email = $1, password = $2 WHERE users.id = $3;`,
            [updatedEmail, updatedPassword, updatedId]
          );
          req.session.userEmail = updatedEmail;
          return res.redirect("/index");
        }
      });
    return;
  });

  router.post("/new", (req, res) => {
    return res.redirect("/index");
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    return res.redirect("/");
  });

  return router;
};
