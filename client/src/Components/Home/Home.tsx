import React from 'react'
import icon from "../Assets/IconBlack.ico"
import Card from "./Card"
import NavigationCard from './NavigationCard'
import PostFormCard from './PostFormCard'
import PostCard from './PostCard'

export default function Home(){
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
