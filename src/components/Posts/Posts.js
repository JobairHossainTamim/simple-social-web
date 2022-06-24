import React from 'react';
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Posts = ({ post }) => {

    const navigate = useNavigate();

    const getUserName = () => {
        const email = post.user.email;
        const userName = email.substring(0, email.length - 10)
        return userName
    }

    return (
        <div className='p-1 cursor-pointer' onClick={() => {
            navigate(`post/${post.id}`);

        }}>
            <div className='flex items-center card-sm p-2'>
                <div className='h-10 w-10  rounded-full bg-gray-500 flex justify-center items-center mr-5 text-white'>
                    <span className='text-2xl '>{getUserName()[0]}</span>
                </div>
                <span>{getUserName()}</span>
            </div>
            <div className='w-[100%] text-center flex justify-center flex-col'>
                <img src={post.imageUrl} alt="" className="h-60 w-60"></img>
                <span className='text-gray-500 text-left my-2 p-1'>{post.description}</span>
            </div>
            <div className='card-sm p-2 flex w-full space-x-5 '>
                <div className='flex space-x-2 items-center'>
                    <AiFillHeart size={25}></AiFillHeart>
                    <h1>{post.likes.length}</h1>
                </div>
                <div className='flex space-x-2 items-center'>
                    <AiOutlineComment size={25}></AiOutlineComment>
                    <h1>{post.comments.length}</h1>
                </div>


            </div>
        </div>
    );
};

export default Posts;