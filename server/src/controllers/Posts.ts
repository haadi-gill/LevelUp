import { RequestHandler } from "express";
import PostModel from "../models/Post";


interface createPostBody {
    author?: String,
    title?: String,
    caption?: String,
    date? : Date,
    likes? : [{userID:String}]
}; 



export const create: RequestHandler = async (req, res, next) => {

    const { author, title, caption} = req.body as createPostBody;

    try {
        if (!author || !title) {
            throw new Error("Missing fields");
        }

        const date = new Date();
        const likes = [];

        const post = await PostModel.create({ author, title, caption, date });

        res.status(201).json({ message: "Post created successfully", post: post });

    }
    catch (error) {
        next(error);
    }
};

export const getMyPosts: RequestHandler = async (req, res, next) => {
    try {
        const posts = await PostModel.find({ _id: req.session.userId }).exec();

        res.status(200).json({ posts: posts });
    }
    catch (error) {
        next(error);
    }
};


export async function updateTitle(id: String, data: String): Promise<void>{

    try {
        const post = await PostModel.find({ _id: id });

    }
    catch (error) {
        next(error);
    }
};
