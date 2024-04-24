export interface Post {
    author: string;
    task: string;
    title: string;
    imageURL?: string;
    likes?: [{ userID: string }];
    date: Date;
    id: String;
}

export interface getPosts {
    posts: Post[];
}