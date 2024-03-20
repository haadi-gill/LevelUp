import { RequestHandler } from "express";
import PostModel from "../models/Post";


interface  PostBody {
    author?: String,
    title?: String,
    caption?: String,
    date?: Date,
}; 



export const register: RequestHandler = async (req, res, next) => {

    const { author, title, caption } = req.body as PostBody;

    try {
        if (!author || !title || !caption ) {
            throw new Error("Missing fields");
        }

    const date = new Date();

        const post = await PostModel.create({ author, title, caption, date });

        res.status(201).json({ message: "Post created successfully", post: post });

    }
    catch (error) {
        next(error);
    }
};