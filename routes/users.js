/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = function(router, database) {

  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });

  const login =  function(email, password) {
    return database.getUser(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  })
  return router;
}

module.exports = router;
