// HOME PAGE /GET
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  if (!req.session.userID) {
    return res.redirect('/')
  }
  return res.render('index')
});

router.post('/update', (req, res) => {
  console.log(req.body);
  return res.redirect('/index')
})

router.post('/new', (req, res) => {
  return res.redirect('/index')
})

router.post('/logout', (req, res) => {
  req.session = null;
  return res.redirect('/');
})

module.exports = router;

