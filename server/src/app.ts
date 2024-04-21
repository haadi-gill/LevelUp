import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/Users";
import session from "express-session";
import postRoutes from "./routes/Posts";

import createHttpError from "http-errors";
import PostModel from "./models/Post";
import UserModel from "./models/User";
import MongoStore from "connect-mongo";


const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 6 * 60 * 60 * 1000, // 6 hours
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_STRING!,
    }),
}));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(Error("Endpoint not found"));
});


app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "An error occurred, please try again";
    let errorCode = 500;
    console.error(error);
    if (error instanceof createHttpError.HttpError) {
        errorMessage = error.message;
        errorCode = error.status;
    }
    
    res.status(errorCode).json({ status: errorCode, message: errorMessage });
});

export default app;