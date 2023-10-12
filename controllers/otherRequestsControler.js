const { Task } = require("../models");

async function postNewTask (req, res, next) {
   try {
      const taskName = req.body.name;
      await Task.create({name:taskName});
      res.status(201).json({message: "Success"});      
   } catch (err) {
      next(err);
   }}

async function putchTaskByID (req, res, next) {
   try {
      const taskId = req.params.id;
      const task = await Task.findByPk(taskId);
      if (!task) {
         throw new Error("Task not found");     
      } 
         const updTask = req.body;
         task.name = updTask.name ||task.name;
         task.completed = updTask.completed || task.completed;
         await task.save();
         res.status(200).json({message: 'Success', task: task});
   } catch (err) {
      next(err);
   }}

async function deleteTaskByID (req, res, next) {
   try {
      const taskId = req.params.id;
      const task = await Task.findByPk(taskId);
      await task.destroy();
      res.status(204).json({message: 'Task deleted'});      
   } catch (err) {
      next(err)
   }
}

module.exports = {
   postNewTask,
   putchTaskByID,
   deleteTaskByID
}