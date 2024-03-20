import mongoose from "mongoose";

const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const PostSchema = new Schema({
    author: String,
    title: String,
    caption: String,
    date: Date,
}); 


const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;