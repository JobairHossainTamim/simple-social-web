import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../DefaultLayout/DefaultLayout';
import { getDocs, collection } from 'firebase/firestore';
import { fireDb } from '../../../firebase.config';
import { useDispatch } from 'react-redux';
import Posts from './../../Posts/Posts';



const Home = () => {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        dispatch({ type: 'showLoading' });
        const querySnapshot = await getDocs(collection(fireDb, "post"));
        const temp = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            temp.push({ ...doc.data(), id: doc.id })
        });
        setData(temp);
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
                            return <Posts post={post} key={post.id}></Posts>
                        })
                    }
                </div>
            </DefaultLayout>

        </div>
    );
};

export default Home;