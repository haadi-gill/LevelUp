import { RequestHandler } from "express";
import PostModel from "../models/Post";


interface createPostBody {
    author?: String,
    title?: String,
    caption?: String,
}; 



export const create: RequestHandler = async (req, res, next) => {

    const { author, title, caption } = req.body as createPostBody;

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

export const getMyPosts: RequestHandler = async (req, res, next) => {
    try {
        const posts = await PostModel.find({ author: req.session.userId }).exec();

        res.status(200).json({ posts: posts });
    }
    catch (error) {
        next(error);
    }
}