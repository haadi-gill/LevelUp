import { fetchData } from "./fetch";
import { Post, getPosts } from "../models/posts";


export interface createPost {
    title: string;
    task: string;
    photos?: string;
    user_id?: string;
}

export interface updatePost {
    postID: string;
    title: string;
    task: string;
}

export const createPost = async (post: createPost) => {
    const response = await fetchData("http://localhost:5000/api/posts/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    });

    return response.json();
}

export const updatePost = async (post: updatePost) => {
    const response = await fetchData("http://localhost:5000/api/posts/update/content", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    });

    return response.json();
}

export const deletePost = async (postID: string) => {
    const response = await fetchData("http://localhost:5000/api/posts/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postID)
    });

    return response.json();
}

export async function getAllPosts(): Promise<getPosts> {
    const response = await fetchData("http://localhost:5000/api/posts/allposts", {
        method: "GET"
    });

    return response.json();
}