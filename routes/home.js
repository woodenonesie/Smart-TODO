// HOME PAGE /GET
const express = require('express');
const router  = express.Router();
const db = require('../db/connection')

module.exports = () => {

router.get('/', (req, res) => {
  if (!req.session.userID) {
    return res.redirect('/')
  }
  console.log("req.session.userID", req.session.userID)
  return res.render('index')
});

router.post('/update', (req, res) => {
  console.log('1', req.body)
  const email = req.body.email;
  const password = req.body.password;
  const id = req.session.usedID;
  console.log('3', email, password, id)
  return db.query(`
  UPDATE users SET email = $1, password = $2 WHERE users.id = $3;`, [email, password, id])
  .then((result) => {
    console.log('2', result)
    return res.redirect('/index')
  })
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

