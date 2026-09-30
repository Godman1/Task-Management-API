const validateTask = (req,res,next) =>{
    if(typeof req.body.title !== "string"){
        return res.status(400).json({
            message:"Title is required"
        })
    }

    if(req.body.title.trim().length<3){
        return res.status(400).json({
            message:"Title must be atleast 3 characters"
        })
    }

    next();
}


module.exports= validateTask;