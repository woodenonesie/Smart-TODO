// HOME PAGE /GET
const express = require('express');
const router  = express.Router();
const db = require('../db/connection')
const bcrypt = require('bcrypt')

module.exports = () => {

router.get('/', (req, res) => {
  if (!req.session.userID) {
    return res.redirect('/')
  }
  console.log(req.session)
  const userEmail = req.session.userEmail
  console.log('userEmail', userEmail)
  console.log("req.session.userID", req.session.userID)
  return res.render('index', {userEmail})
});

router.post('/update', (req, res) => {
  console.log('1', req.body);
  const updatedEmail = req.body.email;
  const updatedPassword = bcrypt.hashSync(req.body.password, 10);
  const updatedId = req.session.userID;
  if (!updatedEmail || !updatedPassword) {
    return res.status(400).send("Please fill in email and password fields. <a href='/'>Try again</a>");
  }
  console.log('vvv')
  db.query(`SELECT * FROM users WHERE users.id = $1;`, [updatedId])
  .then((result) => {
    console.log('IM HEREEEEEE')
    return db.query(`SELECT * from users WHERE email = $1;`, [updatedEmail])
  })
  .then((result) => {
    console.log('testing')
    if (result.rows.length > 0) {
      console.log(result)
      return res.status(400).send("Please enter a different email <a href='/'>Try again</a>")
    } else {
      db.query(`
      UPDATE users SET email = $1, password = $2 WHERE users.id = $3;`, [updatedEmail, updatedPassword, updatedId])
      req.session.userEmail = updatedEmail;
      return res.redirect('/index')
    }
  })
  return;
})

router.post('/new', (req, res) => {
  return res.redirect('/index')
})

router.post('/logout', (req, res) => {
  req.session = null;
  return res.redirect('/');
})

return router;

}

