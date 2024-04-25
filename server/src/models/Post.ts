import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: String,
    title: String,
    task: String,
    caption: String,
    date: Date,
    date_completed: Date,
    imageURL: String,
    complete: Boolean,
    likes: [
        String
    ]/**,
    comments: [
        {
            userID: String,
            comment: String
        }
    ] */
}); 


const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;