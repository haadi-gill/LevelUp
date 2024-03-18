import express, { Request, Response } from "express";
import mongoose from "mongoose";

import PostModel from "./models/Post";

const app = express();

const db = mongoose.connect(
    "mongodb+srv://madepu03:OUngqQc63yvDWX6f@levelupcluster.lui4yjv.mongodb.net/?retryWrites=true&w=majority&appName=LevelUpCluster"
);

app.get("/", (req: Request, res: Response) => { 
    res.send("Hello World");
});



app.listen(5000);