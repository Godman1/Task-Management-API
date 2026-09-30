const TaskService = require("../services/TaskService")

const taskService = new TaskService;

class TaskController{   
    
    async getTasks(req,res){
        const tasks = await taskService.getTasks();
        res.status(200).json(tasks);
        

    }   


    async createTask(req,res){
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    }


    async getTask(req,res){
        const task = await taskService.getTaskById(req.params.id);
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }
        res.status(200).json(task);
       
           
    }   

    async updateTask(req,res){
        const task = await taskService.updateTask(req.params.id, req.body);
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        res.status(200).json(task);
        
    }

    async completeTask(req,res){
        const task = await taskService.completeTask(req.params.id);
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        res.status(200).json(task);
    }


    async deleteTask(req,res){
        const task = await taskService.deleteTask(req.params.id)
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        res.status(204).json(task);

    }

}



module.exports= TaskController;