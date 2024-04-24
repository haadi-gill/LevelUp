import { useEffect, useState } from 'react'
import NavigationCard from './NavigationCard'
import PostFormCard from './PostFormCard'
import PostCard from './PostCard'
import { useParams } from 'react-router-dom'

export default function Home(){

    const {id} = useParams()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        console.log(id)
    }, [id])

    return(
      <div className="flex mt-4 max-w-4xl mx-auto gap-6">
        <div className="w-1/3">
          <NavigationCard />
        </div>
        <div className="w-2/3">
          <PostFormCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
        </div>
      </div>
    )
}
