const {Task} = require('../models');

async function getAllTasks(req, res, next) {
   try {
      const tasks = await Task.findAll();
   res.json({tasks: tasks});
   } catch (err) {
      next(err);
   }
}

async function getTaskByID(req, res, next) {
   try {
   const tasksId = req.params.id
   const tasks = await Task.findByPk(tasksId); 
   if (tasks.length === 0) {
      throw new Error('Task not found')
   }
   res.json({task: tasks});
} catch (err) {
   next(err)
}
}

module.exports = {
   getAllTasks,
   getTaskByID
}