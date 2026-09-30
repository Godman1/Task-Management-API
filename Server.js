require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const taskRoutes = require("./routes/TaskRoutes")
const errorHandler= require("./middleware/ErrorHandler")
const port= 5000


const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

startServer();