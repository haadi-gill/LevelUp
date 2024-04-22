import { RequestHandler } from "express";
import PostModel from "../models/Post";


interface createPostBody {
    author?: String,
    title?: String,
    caption?: String,
    date? : Date,
    complete?: boolean,
    likes? : [{userID:String}]
}; 

interface updatePostBody {
    postID?: String,
    data?: String
}


export const create: RequestHandler = async (req, res, next) => {

    const { author, title, caption} = req.body as createPostBody;

    try {
        if (!author || !title) {
            throw new Error("Missing fields");
        }

        const date = new Date();
        const likes = [];
        const complete = false;

        const post = await PostModel.create({ author, title, caption, date, complete});

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




/**
 *  A function to update the Title of a Post using the unique post ID within the Mongo database
 */
export const updateTitle: RequestHandler = async (req, res, next) => {

    const {postID, data} = req.body as updatePostBody;

    try {
        /**
         * required to have the post id and the new value of the title in order to operate this command
         */
        if(!postID || !data){
            throw new Error("Missing fields");
        }

        /**
         * Since the post is being updated, change the previous date value to the value of the most recent update
         */
        const date = new Date();
        
        /**
         * To ensure that the post is within the database, since the command will only update, not create 
         */
        const post = await PostModel.find({ _id: postID });

        /** 
         * Length of zero means the post was not found in the database. This is worthy of throwing an error, as the function cannot be completed
         */
        if (post.length == 0){
            throw new Error("Post not found")
        }

        /**
         * Update both the title value and the date value of the particular post entry
         * This is being stored as a newPost value to be sent to the status update, displaying the updated values
         */
        const newPost = await PostModel.updateOne({_id: postID}, {$set: {title: data, date: date}});


        /**
         * Send a status update to show the post data has been modified successfully
         */
        
        res.status(201).json({ message: "Post Update Successful", post:newPost});

    }
    catch (error) {
        next(error);
    }
};



/**
 *  A function to update the Caption of a Post using the unique post ID within the Mongo database
 * Follows same format as updateTitle
 */
export const updateCaption: RequestHandler = async (req, res, next) => {

    const {postID, data} = req.body as updatePostBody;

    try {
        
        if(!postID || !data){
            throw new Error("Missing fields");
        }

        const date = new Date();
        
        const post = await PostModel.find({ _id: postID });

        if (post.length == 0){
            throw new Error("Post not found")
        }

        const newPost = await PostModel.updateOne({_id: postID}, {$set: {caption: data, date: date}});


        
        res.status(201).json({ message: "Post Update Successful", post:newPost});

    }
    catch (error) {
        next(error);
    }
};



interface updatePostComplete{
    postID?: String,
    data?: Boolean
}



/**
 *  A function to update the "done" status of a post 
 *  Will need to be accompanied by a call to the user database to update XP
 * Follows same format as updateTitle
 */
export const updateCompletion: RequestHandler = async (req, res, next) => {
    const {postID, data} = req.body as updatePostComplete;

    try {
        
        if(!postID){
            throw new Error("Missing fields");
        }

        const date = new Date();
        
        const post = await PostModel.find({ _id: postID });

        if (post.length == 0){
            throw new Error("Post not found")
        }

        const newPost = await PostModel.updateOne({_id: postID}, {$set: {complete: data, date: date}});

        
        res.status(201).json({ message: "Post Update Successful", post:newPost, oldPost: post});

    }
    catch (error) {
        next(error);
    }
};



/**
 *  A function to update the "done" status of a post 
 *  Follows same format as updateTitle
 * 
 */
export const updateLiked: RequestHandler = async (req, res, next) => {
    const {postID} = req.body as updatePostComplete;

    try {
        
        if(!postID){
            throw new Error("Missing fields");
        }

        const date = new Date();
        
        const post = await PostModel.find({ _id: postID });

        if (post.length == 0){
            throw new Error("Post not found")
        }

        const userId = req.session.userId?.toString();
        let likes = post[0].likes;


        /** 
         * automatically handle either adding to likes if not there or removing if it is
         */
        if(likes.includes(userId!)){
            likes = likes.filter(item => item !== userId!);
        }else{
            likes.push(userId!);
        }


        const newPost = await PostModel.updateOne({_id: postID}, {$set: {likes: likes, date: date}});

        
        res.status(201).json({ message: "Post Update Successful", post:newPost});

    }
    catch (error) {
        next(error);
    }
};
