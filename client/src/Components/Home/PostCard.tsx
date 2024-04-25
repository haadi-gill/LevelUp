import { useState, useEffect} from 'react';
import Card from "./Card";
import Avatar from "./Avatar";
import { Post, updateLiked } from '@/models/posts';
import * as UsersApi from '../../network/users_api';
import * as PostsApi from '../../network/posts_api';

export default function PostCard({post, id,  }: {post: Post, id : string}) {
    const [likes, setLikes] = useState<number>(post.likes.length);
    const isLiked = post.likes.includes(id);
    const [liked, setLiked] = useState(isLiked);
    const [author, setauthor] = useState("");
    const [formattedDate, setFormattedDate] = useState("");


    useEffect(() => {
        console.log(post);
        
        const fetchAuthor = async () => {
            const response = await UsersApi.getUserById(post.author);
            console.log(response);
            setauthor(response.user.username);
        }

        fetchAuthor();
        formatPostDate(post.date.toString());
    }, []);

    const formatPostDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amOrPm = hours >= 12 ? ' PM' : ' AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
        // Function to get the day with proper suffix
        const getDayWithSuffix = (day: number) => {
            if (day >= 11 && day <= 13) {
                return `${day}th`;
            }
            switch (day % 10) {
                case 1:
                    return `${day}st`;
                case 2:
                    return `${day}nd`;
                case 3:
                    return `${day}rd`;
                default:
                    return `${day}th`;
            }
        };
    
        const formatted = `${month} ${getDayWithSuffix(day)}, ${year} ${formattedHours}:${formattedMinutes}${amOrPm}`;
        setFormattedDate(formatted);
    };
    
    const updatedLikes = async () => {
        const params: updateLiked = {
            userID: id,
            postID: post._id,
        };

        try {
            const response = await PostsApi.updateLikes(params);
            console.log(response);
            setLikes(response.post.likes.length);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
                console.error(error.message);
            } else {
                console.error("An unexpected error occurred.");
            }
        }
    }

    const  handleLike = async () => {
        setLiked(!liked); // Toggle the 'liked' state
        if (!liked) {
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1);
        }
        updatedLikes(); // Call updateLikes regardless of current state to sync with server
    };

    

    return (
        <Card>
            <div className="flex gap-3">
                <div>
                    <button className="flex gap-2 items-center">
                        <div>
                            <Avatar />
                        </div>
                        <p>
                            <a className="font-semibold">{author}</a> shared a goal.
                        </p>
                        <p className="text-gray-500 text-sm text-left">{formattedDate}</p>
                        <p className={`text-m ${post.complete ? 'text-green-500' : 'text-red-500'}`}>
                        {post.complete ? 'Goal Complete!' : 'Goal Not Complete!'}
                        </p>
                    </button>
                </div>
            </div>
            <div>
                <p className="text-left my-3 text-xl font-semibold">{post.title}</p>
                <p className="text-left my-3 text-m">{post.task}</p>
                <p className="text-left my-3 text-l font-semibold">GOAL XP: 10</p>
                <img src={post.imageURL}/>
            </div>
            <div className="mt-5 flex gap-5">
                <button className="flex gap-2 items-center" onClick={handleLike}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? "Red" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transition-all hover:scale-110">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    {likes}
                </button>
                <button className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transition-all hover:scale-110">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    5
                </button>
                <button className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                </button>
            </div>
            <div className="flex mt-4 gap-3">
                <div>
                    <Avatar />
                </div>
                <textarea className="border w-full grow p-3 px-4 overflow-hidden h-12 rounded-full" placeholder="Leave a comment!"></textarea>
            </div>
        </Card>
    );
}