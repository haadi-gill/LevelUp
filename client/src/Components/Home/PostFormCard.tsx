import Card from './Card'
import Avatar from './Avatar'
import { useForm } from 'react-hook-form'
import { createPost } from '../../network/posts_api'
import * as PostsApi from '../../network/posts_api'

export default function PostFormCard( props : {user_id: string, onPostCreate: () => void}){

    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            task: "",
            photos: "",
            title:""
        }
    });

    const onSubmit = async (createPostInfo: createPost) => {
        try {
            createPostInfo.user_id = props.user_id;
            const response = await PostsApi.createPost(createPostInfo);
            console.log(response);
            props.onPostCreate();
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
                console.error(error.message);
            }
            else {
                console.error("An unexpected error occurred.");
            }
        }
        reset();
    }

    const onFileChange = (e: any) => {
        const files = e.target.files;
        setValue("photos", URL.createObjectURL(files[0]));
    };

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 mb-3 p-2">
                    <div>
                        <Avatar />
                        <p className="text-left my-3 text-xl font-semibold">Create a New Post</p>
                    </div>
                    <div className="border border-black rounded-m">
                        <input
                            {...register('title', { required: 'Title is required' })}
                            className="p-5 h-7 w-full"
                            placeholder="Please title your task!"
                        />
                    </div>
                    {errors.title && <p className="error">{errors.title.message}</p>}
                    <div className="border border-black rounded-md">
                        <textarea
                            {...register('task', { required: 'Task description is required' })}
                            className="p-3 h-14 w-full"
                            placeholder="What is your next task? Let's LevelUp!"
                        />
                    </div>
                    {errors.task && <p className="error">{errors.task.message}</p>}
                </div>
                <div className="flex gap-5 items-center mt-2 pl-1">
                    <div>
                        <label className="flex gap-1 bg-indigo-600 text-white px-6 py-2 rounded-xl cursor-pointer hover:scale-105 transition-all hover:shadow-md shadow-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <span>Photos</span>
                            <input type="file" multiple {...register('photos')} onChange={onFileChange} hidden />
                        </label>
                    </div>
                    <div className="grow text-right">
                        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all hover:shadow-md shadow-gray-700">Share</button>
                    </div>
                </div>
            </form>
        </Card>
    );
}