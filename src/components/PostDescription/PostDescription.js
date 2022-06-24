import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefaultLayout from '../DefaultLayout/DefaultLayout';
import { useDispatch } from 'react-redux';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { fireDb } from '../../firebase.config';
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { AiFillCloseCircle, AiOutlineShareAlt } from 'react-icons/ai'
import moment from 'moment';

const PostDescription = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const [post, setPost] = useState(null)
    const currentUser = JSON.parse(localStorage.getItem('my-social'));
    const [showLike, setShowLike] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [commentText, setCommentText] = useState('');
    const navigate = useNavigate();


    const getUserName = (text) => {
        const email = text;
        const userName = email.substring(0, email.length - 10)
        return userName
    }
    const getData = () => {
        dispatch({ type: 'showLoading' });
        getDoc(doc(fireDb, 'post', params.id)).then((response) => {
            setPost({ ...response.data(), id: response.id });
            if (response.data().likes.find((user) => user.id === currentUser.id)) {
                setAlreadyLiked(true);
            } else {
                setAlreadyLiked(false);
            }

            dispatch({ type: 'hideLoading' });
        })
    }



    useEffect(() => {
        getData()
    }, []);


    // comment

    const addComment = () => {
        let updatedComment = post.comments;


        updatedComment.push({
            id: currentUser.id,
            email: currentUser.email,
            commentText,
            createdOn: moment().format('DD-MM-YYYY')
        });


        setDoc(doc(fireDb, "post", post.id), { ...post, comments: updatedComment })
            .then(() => {
                getData();
                setCommentText('')

            })
            .catch(() => {
                toast.error("An error occurred");
            });
    }
    // Like or unlike


    const LikeOrUnLike = () => {

        let updatedLikes = post.likes;

        if (alreadyLiked) {
            toast.success("Post liked Remove");
            updatedLikes = post.likes.filter((user) => user.id !== currentUser.id);
        } else {
            toast.success("Post liked successfully");
            updatedLikes.push({
                id: currentUser.id,
                email: currentUser.email,
            });
        }

        setDoc(doc(fireDb, "post", post.id), { ...post, likes: updatedLikes })
            .then(() => {
                getData();


            })
            .catch(() => {
                toast.error("An error occurred");
            });

    }

    return (
        <div>
            <DefaultLayout>
                <div className='flex w-full justify-center space-x-5 md:flex-col'>
                    {
                        post && (
                            <>
                                {/* Like Display */}
                                {showLike && <div className='w-96'>
                                    <div className='flex justify-between'>
                                        <h1 className='text-xl font-semibold text-gray-500'>Liked By</h1>
                                        <AiFillCloseCircle className='cursor-pointer' size={25} onClick={() => {
                                            setShowLike(false)
                                        }}></AiFillCloseCircle>
                                    </div>
                                    <hr />
                                    {
                                        post.likes.map((like) => {
                                            return (
                                                <div key={like.id} className='flex items-center card-sm p-2 mt-2'>
                                                    <div className='h-10 w-10  rounded-full bg-gray-500 flex justify-center items-center mr-5 text-white'>
                                                        <span className='text-2xl '>{getUserName(like.email)[0]}</span>
                                                    </div>
                                                    <span>{getUserName(like.email)}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}
                                {/* Main */}
                                <div className='h-[500px] w-[500px]'>



                                    <div className='flex items-center card-sm p-2'>
                                        <div className='h-10 w-10  rounded-full bg-gray-500 flex justify-center items-center mr-5 text-white'>
                                            <span className='text-2xl '>{getUserName(post.user.email)[0]}</span>
                                        </div>
                                        <span>{getUserName(post.user.email)}</span>
                                    </div>
                                    <div className='w-[100%] text-center flex justify-center'>
                                        <img src={post.imageUrl} alt="" className="h-60 w-60"></img>
                                    </div>
                                    <div className='card-sm p-2 flex w-full space-x-5 '>
                                        <div className='flex space-x-2 items-center'>
                                            <AiFillHeart size={25} onClick={() => { LikeOrUnLike() }} color={alreadyLiked ? "red" : "gray"}></AiFillHeart>
                                            <h1 onClick={() => { setShowLike(true) }} className='underline font-semibold cursor-pointer'>{post.likes.length}</h1>
                                        </div>
                                        <div className='flex space-x-2 items-center'>
                                            <AiOutlineComment onClick={() => { setShowComment(true) }} size={25}></AiOutlineComment>
                                            <h1 className='cursor-pointer' >{post.comments.length}</h1>
                                        </div>
                                        <div>
                                            <AiOutlineShareAlt className='cursor-pointer' onClick={() => navigate(`/sharePost/${post.id}`)} size={25}></AiOutlineShareAlt>
                                        </div>


                                    </div>
                                </div>
                                {/* Comments */}
                                {showComment && (<div className='w-90'>
                                    <div className='flex justify-between'>
                                        <h1 className='text-xl font-semibold text-gray-500'>Comments</h1>
                                        <AiFillCloseCircle className='cursor-pointer' size={25} onClick={() => {
                                            setShowComment(false)
                                        }}></AiFillCloseCircle>
                                    </div>

                                    {post.comments.map((comment) => {
                                        return (
                                            <div className='card-sm mt-2 p-2' key={comment.id}>
                                                <h1 className='text-xl text-left'>{comment.commentText}</h1>
                                                <h1 className='text-right text-md'>By : {getUserName(comment.email)} on : {comment.createdOn} </h1>

                                            </div>
                                        )
                                    })}
                                    <div className='flex flex-col'>
                                        <textarea className=" border-dashed border-gray-500 border-2 w-full md:w-full my-5 py-5" rows='2' value={commentText} onChange={(e) => { setCommentText(e.target.value) }}></textarea>
                                        <button onClick={() => { addComment() }} className='bg-primary h-10 rounded-sm text-white px-5 mt-1 '>Add Comment</button>
                                    </div>
                                </div>)}

                                {/*  */}
                            </>)
                    }
                </div>
            </DefaultLayout>
        </div>
    );
};

export default PostDescription;