const Task = require("../models/Task") 

class TaskService{
    async createTask(taskInput){
        const task = new Task(taskInput)
        return await task.save();
    }


    async getTasks(){
        return await Task.find();

    }

    async getTaskById(taskId){
        
        return await Task.findById(taskId);

    }

    async updateTask(taskId,taskInput){
        return await 
        Task.findByIdAndUpdate(
            taskId,
            taskInput,
            {new:true},
            {runValidators:true});
        
    }


    async completeTask(taskId){
        return await 
        Task.findByIdAndUpdate(
            taskId,
            {completed:true},
            {new:true})
    }

    async deleteTask(taskId){
        return await Task.findByIdAndDelete(taskId)
       
    }
}


module.exports= TaskService;





