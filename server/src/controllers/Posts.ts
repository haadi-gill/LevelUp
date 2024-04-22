import { RequestHandler } from "express";
import PostModel from "../models/Post";


interface createPostBody {
    task?: String,
    photos?: String,
    likes? : [{userID:String}]
    user_id?: String
}; 



export const create: RequestHandler = async (req, res, next) => {

    const { task, photos, user_id } = req.body as createPostBody;

    try {
        if (!task) {
            throw new Error("Missing fields");
        }

        const author = user_id;
        console.log(req.session);
        const date = new Date();
        const likes: { userID: string }[] = [];
        const imageURL = photos;

        const post = await PostModel.create({ author, task, date, imageURL, likes });

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

export const getAllPosts: RequestHandler = async (req, res, next) => {
    try {
        const posts = await PostModel.find().exec();

        res.status(200).json({ posts: posts });
    }
    catch (error) {
        next(error);
    }
}