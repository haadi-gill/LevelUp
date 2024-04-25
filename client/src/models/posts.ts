export interface Post {
    author: string;
    task: string;
    _id: string;
    title: string;
    imageURL?: string;
    likes: string[];
    date: Date;
    complete: boolean;
}

export interface getPostAfterUpdate {
    message: string;
    post: Post;
    likes: string[];
}

export interface getPosts {
    posts: Post[];
}

export interface updateLiked {
    postID: string;
    userID: string;
    data?: boolean;
}