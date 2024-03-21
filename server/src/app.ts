import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/Users";
import session from "express-session";

import PostModel from "./models/Post";
import UserModel from "./models/User";
import MongoStore from "connect-mongo";

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_STRING!,
    }),
}));

app.use("/api/users", userRoutes);

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