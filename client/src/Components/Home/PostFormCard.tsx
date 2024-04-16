import Card from './Card'
import Avatar from './Avatar'

export default function PostFormCard(){
    return(
        <Card>
            <div className="flex gap-2 mb-3">
                <div>
                    <Avatar/>
                </div>
                <textarea className="grow p-3 h-17" placeholder={"What is your next task? Let's LevelUp!"} />
            </div>
            <div className="flex gap-5 items-center mt-2 pl-1">
                <div>
                    <button className="flex gap-1 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all hover:shadow-md shadow-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    Photos</button>
                </div>
                <div className="grow text-right">
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all hover:shadow-md shadow-gray-700">Share</button>
                </div>
            </div>
        </Card>
    );
}