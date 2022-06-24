import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDocs, doc, getDoc } from 'firebase/firestore';
import { fireDb } from '../../../firebase.config';
import DefaultLayout from '../../DefaultLayout/DefaultLayout';
import Posts from '../../Posts/Posts';
import { collection } from 'firebase/firestore';




const Shares = () => {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('my-social'));

    const getData = async () => {
        dispatch({ type: 'showLoading' });
        const result = await getDoc(doc(fireDb, "users", user.id));

        setData(result.data().shares);
        dispatch({ type: 'hideLoading' })
    }


    useEffect(() => {
        getData();
    }, [])



    return (
        <div>
            <DefaultLayout>
                <div className='grid grid-cols-4 md:grid-cols-1'>
                   
                {
                   
                        data.map((post) => {
                            return <div>
                                <Posts post={post} key={post.id}></Posts>
                                <h1 className='mt-2 text-gray-500'>Shared By : {post.sharedBy.email}</h1>
                            </div>
                        })
                       
                    }
                </div>
            </DefaultLayout>

        </div>
    );
};

export default Shares;