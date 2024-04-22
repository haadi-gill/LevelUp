import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: String,
    title: String,
    caption: String,
    date: Date,
    complete: Boolean,
    likes: [
        {
            userID: String
        }
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