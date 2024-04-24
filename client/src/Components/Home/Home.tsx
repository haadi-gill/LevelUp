import { useEffect, useState } from 'react'
import NavigationCard from './NavigationCard'
import PostFormCard from './PostFormCard'
import PostCard from './PostCard'
import { getPosts, Post } from '@/models/posts'
import { useParams } from 'react-router-dom'
import * as PostsApi from '../../network/posts_api'
export default function Home(){

    const {id} = useParams<string>()
    const userId = id || 'default'
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await PostsApi.getAllPosts();
          console.log(response);
          setPosts(response.posts);
      } catch (error) {
          if (error instanceof Error) {
              alert(error.message);
              console.error(error.message);
          }
          else {
              console.error("An unexpected error occurred.");
          }
      }
    };

    fetchPosts();
    }, [])

    const fetchUpdatedPosts = async () => {
      try {
          const response = await PostsApi.getAllPosts();
          console.log(response);
          setPosts(response.posts);
      } catch (error) {
          if (error instanceof Error) {
              alert(error.message);
              console.error(error.message);
          } else {
              console.error("An unexpected error occurred.");
          }
      }
    };
  
    const sortPostsByDate = (posts: Post[]) => {
      return posts.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    };

    return(
      <div className="flex mt-4 max-w-9xl mx-auto gap-8">
        <div className="w-1/3">
          <NavigationCard />
        </div>
        <div className="w-2/3">
          <PostFormCard user_id={userId} onPostCreate={fetchUpdatedPosts}/>
          {posts.length > 0 && sortPostsByDate(posts).map((post, index) => (
                    <PostCard key={index} post={post} id={userId} />
                ))}
        </div>
      </div>
    )
}
