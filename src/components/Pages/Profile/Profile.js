import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../DefaultLayout/DefaultLayout';
import { useDispatch } from 'react-redux';
import { doc, getDocs, getDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { fireDb } from '../../../firebase.config';
import { useParams } from 'react-router-dom';
import Posts from './../../Posts/Posts';

const Profile = () => {

    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const params = useParams();
    const [user, setUser] = useState([]);

    const getPost = async () => {
        dispatch({ type: 'showLoading' });
        const querySnapshot = await getDocs(collection(fireDb, "post"));
        const temp = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            temp.push({ ...doc.data(), id: doc.id })
        });
        const filteredPost = temp.filter((post) => post.user.id === params.id);
        setPosts(filteredPost);
        dispatch({ type: 'hideLoading' })
    }

    const getUser = async () => {
        const result = await getDoc(doc(fireDb, 'users', params.id));
        setUser(result.data());

    }
    const getUserName=(text)=>{
        const email=text;
        const userName = email.substring(0, email.length - 10)
        return userName
    }

    useEffect(() => {
        getPost();
        getUser();
    }, []);


    return (
        <DefaultLayout>
           {user && (
            <>
             <div>
                <div className='flex items-center card-sm p-2'>
                    <div className='h-24 w-24 rounded-full bg-gray-500 flex justify-center items-center text-white mr-2'>
                        <span className='text-2xl'>
                            {getUserName(user.email)[0]}
                        </span>
                    </div>
                 <div className='flex flex-col space-y-2 '>
                 <span className='flex flex-end'>{getUserName(user.email)}</span>
                 <span>{user.email}</span>
                 <hr></hr>
                 <span className='flex flex-end'>{user.bio}</span>
                 </div>
                </div>
            </div>
            {/* Post uploaded */}
            <div className="mt-10">
            <div className="card-sm p-2">
              <h1>Posts uploaded by {getUserName(user.email)}</h1>
              <div className='grid grid-cols-4 md:grid-cols-1 my-2'>
                    {
                        posts.map((post) => {
                            return <Posts post={post} key={post.id}></Posts>
                        })
                    }
                </div>
            </div>



            </div>
            </>
           )}
        </DefaultLayout>
    );
};

export default Profile;