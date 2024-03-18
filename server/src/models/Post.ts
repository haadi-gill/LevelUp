import mongoose from "mongoose";

const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const PostSchema = new Schema({
    author: objectId,
    title: String,
    body: String,
    date: Date,
}); 


const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;