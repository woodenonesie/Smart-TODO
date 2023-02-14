// REGISTER /GET /POST
const express = require('express');
const { DatabaseError } = require('pg');
const router  = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/connection')

router.get('/', (req, res) => {
  if (req.session.userID) {
    return res.redirect('/index')
  }
  return res.render('welcome')
});

router.post('/register', (req, res) => {
  // const user = req.body;          /*WAITING UNTIL DB LINKED*/
  // user.password = bcrypt.hashSync(user.password, 10);
  // const newEmail = user.email;
  // const newPassword = user.password;
  // db.query(`INSERT INTO users (email, password)
  // VALUES ($1, $2)
  // RETURNING *;`, [newEmail, newPassword])
  // .then((result) => {
  //   console.log(result.rows[0])
  //   return result.rows[0];
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  return res.redirect('/')
});

// const login =  function(email, password) { ////// FINISH THIS
//   return db.getUserWithEmail(email)
//   .then(user => {
//     if (bcrypt.compareSync(password, user.password)) {
//       return user;
//     }
//     return null;
//   });
// }
//////
router.post('/login', (req, res) => {
  const user = req.body;
  // const {email, password} = req.body;        /*WAITING UNTIL DB LINKED*/
  // login(email, password)
  //   .then(user => {
  //     if (!user) {
  //       res.send({error: "error"});
  //       return;
  //     }
  //     req.session.userId = user.id;
  //     res.send({user: {email: user.email, id: user.id}});
  //   })
  //   .catch(e => res.send(e));
  req.session.userID = user.email
  return res.redirect('/index')
});

module.exports = router;
