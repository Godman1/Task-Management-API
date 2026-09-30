const express = require("express")
const validateTask = require("../middleware/TaskValidation")
const TaskController= require("../controller/TaskController")

const router= express.Router(); 

const taskController = new TaskController();


router.get("/", (req, res) =>{
    return taskController.getTasks(req,res);
});



router.post("/", validateTask, (req,res) =>{
    return taskController.createTask(req,res); 

})



router.get("/:id", (req,res) =>{
    return taskController.getTask(req,res)

})


router.put("/:id", validateTask, (req,res)=>{
    return taskController.updateTask(req,res)
})



router.patch("/:id/complete", (req,res) => {
    return taskController.completeTask(req,res)
})



router.delete("/:id", (req,res) =>{
    return taskController.deleteTask(req,res)
})




module.exports= router;