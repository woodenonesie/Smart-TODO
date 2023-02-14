/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const query = require('../db/queries/tasks');
const newCategory = require('./helpers/categoryApi.js');

//change
//delete

router.get('/', (req, res) => {
  // const userId = req.session.userId;
  // if (!userId) {
  //   res.error("Please log in");
  //   return;
  // }
  const userId = 1;
  query.getAllUserTasks(userId)
    .then(data => {
      res.json({ data });
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.post('/create', (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }
  // const userId = req.session.userId;
  const userId = 1;
  const task = req.body.text;

  newCategory.newCategory(task)
    .then((category) => {
      const newTask = {
        task,
        category
      };
      return newTask;
    })
    .then((newTask) => {
      query.newTask(userId, newTask);
    })
    .then(() => {
      res.json({ "success": true });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/change/:id', (req, res) => {
  // const userId = req.session.userId;
  // if (!userId) {
  //   res.error("Please log in");
  //   return;
  // }
  const userId = 1;
  const taskId = req.params.id;
  const newCategory = req.body.newCategory;
  query.editTask(userId, taskId, newCategory)
    .then(() => {
      res.json({ "success": true });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/delete/:id', (req, res) => {
  // const userId = req.session.userId;
  // if (!userId) {
  //   res.error("Please log in");
  //   return;
  // }
  const userId = 1;
  const taskId = req.params.id;
  query.deleteTask(userId, taskId)
    .then(() => {
      res.json({ "success": true });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
