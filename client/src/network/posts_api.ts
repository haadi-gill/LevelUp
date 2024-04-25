import { fetchData } from "./fetch";
import { Post, getPostAfterUpdate, getPosts, updateLiked } from "../models/posts";


export interface createPost {
    title: string;
    task: string;
    photos?: string;
    user_id?: string;
    likes?: string[];
}

export interface updatePost {
    postID: string;
    title: string;
    task: string;
}
export interface deletePost {
    postID: string;
}

export interface updatePost {
    postID: string;
    title: string;
    task: string;
}
export interface deletePost {
    postID: string;
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

export const deletePost = async (post: deletePost) => {
    
    const response = await fetch("http://localhost:5000/api/posts/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    });
    return response.json();
}

export async function getAllPosts(): Promise<getPosts> {
    const response = await fetchData("http://localhost:5000/api/posts/allposts", {
        method: "GET"
    });

    return response.json();
}

export async function getMyPosts(user_id: string): Promise<getPosts> {
    const response = await fetchData(`http://localhost:5000/api/posts/myposts/${user_id}`, {
        method: "GET"
    });

    return response.json();
}

export async function updateLikes(params: updateLiked): Promise<getPostAfterUpdate> {

    const response = await fetchData("http://localhost:5000/api/posts/update/likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ postID: params.postID, userID: params.userID })
    });

    return response.json();
}