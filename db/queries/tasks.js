const db = require('../connection');

const getAllUserTasks = (user_id) => {
  return db
    .query(`
  SELECT * FROM tasks
  WHERE user_id = $1;
  `,
      [user_id])
    .then((result) => {
      if (result) {
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
}
exports.getAllUserTasks = getAllUserTasks;


const newTask = (user_id, task) => {
  return db
    .query(`
  INSERT INTO tasks (user_id, task, category)
    VALUES ($1, $2, $3)
    RETURNING*;`,
      [user_id, task.task, task.category])
    .then((result) => {
      if (result) {
        console.log(result.rows);
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
}
exports.newTask = newTask;


const deleteTask = (user_id, id) => {
  return db
    .query(`
    DELETE FROM tasks
    WHERE user_id = $1 AND id = $2
    RETURNING *;`,
      [user_id, id])
    .then((result) => {
      if (result) {
        console.log(result.rows);
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
}
exports.deleteTask = deleteTask;


const editTask = (user_id, id, category) => {
  return db
    .query(`
    UPDATE tasks
    SET category = $3
    WHERE user_id = $1 AND id = $2
    RETURNING *;`,
      [user_id, id, category])
    .then((result) => {
      if (result) {
        console.log(result.rows);
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
}
exports.editTask = editTask;
