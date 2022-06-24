import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { app, fireDb } from '../../../firebase.config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import Loader from '../../Loader/Loader';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

    const { loading } = useSelector(store => store)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = () => {
        // show
        dispatch({ type: 'showLoading' })

        const auth = getAuth(app);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 

                const user = userCredential.user;
                getDoc(doc(fireDb, 'users', user.uid)).then((user) => {

                    console.log(user.data());
                    localStorage.setItem("my-social", JSON.stringify({ ...user.data(), id: user.id }))
                    toast.success('Login Success ');
                    navigate('/')
                });
                dispatch({ type: 'hideLoading' });



            })
            .catch((error) => {
                toast.error('Login Failed ')
                dispatch({ type: 'hideLoading' });
            });
    }

    useEffect(() => {
        if (localStorage.getItem('my-social')) {
            navigate('/home')
        }
    })

    return (
        <div className='h-screen flex justify-between  flex-col overflow-x-hidden '>
            {loading && <Loader></Loader>}

            {/* top corner */}
            <div className='flex justify-start '>
                <div className='h-24 bg-primary w-96 transform -skew-x-[25deg] -ml-10 flex items-center justify-center'>
                    <h1 className='text-center text-6xl font-semibold skew-x-[25deg]  text-white'>Simple</h1>
                </div>
            </div>
            {/* Form  */}

            <div className='flex justify-center'>
                <div className='w-[420px] flex flex-col space-y-5 card p-10'>
                    <h1 className='text-4xl text-primary font-semibold'> ----Get Login</h1>
                    <hr></hr>
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder='Email'
                        type='text' className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5"></input>
                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder='Password'
                        type='password' className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5"></input>

                    <div className='flex justify-end'>
                        <button onClick={login} className=" bg-primary h-10 rounded-sm px-10 text-white">login</button>
                    </div>
                    <hr></hr>
                    <Link to='/register' className='text-[14px] text-primary '>Not yet Register ?? Please Register</Link>


                </div>
            </div>
            {/* end corner */}
            <div className='flex justify-end '>
                <div className='h-24 bg-primary w-96 transform skew-x-[25deg] -mr-10 flex items-center justify-center'>
                    <h1 className='text-center text-6xl font-semibold -skew-x-[25deg]  text-white'>Social</h1>
                </div>
            </div>
        </div>
    );
};

export default Login;