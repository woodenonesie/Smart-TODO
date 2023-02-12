// REGISTER /GET /POST
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  return res.render('welcome')
});

router.post('/register', (req, res) => {
  return res.redirect('/')
});

router.post('/login', (req, res) => {
  return res.redirect('/index')
});

module.exports = router;
