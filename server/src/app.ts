import "dotenv/config";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";

import userRoutes from "./routes/Users";

import PostModel from "./models/Post";
import UserModel from "./models/User";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);


app.get("/", (req: Request, res: Response) => { 
    res.send("Hello World");
});

app.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body;
        const user = new UserModel({ username, password, email });
        await user.save();
        res.send("User registered successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/", (req: Request, res: Response) => { 
    res.send("Hello World");
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An error occurred, please try again";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(404).send(errorMessage);
});


export default app;