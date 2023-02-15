// REGISTER /GET /POST
const express = require('express');
const { DatabaseError } = require('pg');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

router.get('/', (req, res) => {
  if (req.session.userID) {
    return res.redirect('/index')
  }
  return res.render('welcome')
});

router.post('/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  const newEmail = user.email;
  const newPassword = user.password;
  db.query(`INSERT INTO users (email, password)
  VALUES ($1, $2)
  RETURNING *;`, [newEmail, newPassword])
  .then((result) => {
    console.log(result.rows[0])
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err);
  });
  return res.redirect('/')
});
//////////
const getUserWithEmail = function(email) {
  console.log("checkpoint 9")
  return db
    .query(`SELECT * FROM users WHERE users.email = $1;`, [email])
    .then((result) => {
      console.log("checkpoint 10", result)

      if (!result) {return null};
      return result.rows[0];
    })
    .catch((err) => {
      console.log("checkpoint 11")

      console.log(err.message);
    });
}
exports.getUserWithEmail = getUserWithEmail;

const login =  function(email, password) {
  console.log("checkpoint 6")
  return getUserWithEmail(email)
  .then(user => {
    console.log("checkpoint 7", password, user)

    // if (bcrypt.compareSync(password, user.password)) {
    if (password === user.password) {
      console.log("checkpoint 8")

      return user;
    }
    return null;
  });
}
exports.login = login;
/////////
router.post('/login', (req, res) => {
  const user = req.body;
  const {email, password} = req.body;
  console.log("checkpoint 1");
  login(email, password)
    .then(user => {
      console.log("checkpoint 2")
      if (!user) {
        console.log("checkpoint 3")
        res.send({error: "error"});
        return;
      }
      // res.send({user: {email: user.email, id: user.id}});
      console.log("checkpoint 4")
      req.session.userID = user.id
      return res.redirect('/index')
    })
    .catch(e => {
      console.log("checkpoint 5")
      res.send(e)
      return;
    });

  console.log(req.session.userID)
});
return router;
}
