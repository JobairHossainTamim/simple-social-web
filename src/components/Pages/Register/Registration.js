import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fireDb, app } from '../../../firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import Loader from '../../Loader/Loader';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
// import { Navigate } from "react-router-dom";


const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setComfirmPassword] = useState('');
    const { loading } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const register = () => {
        dispatch({ type: 'showLoading' })


        const auth = getAuth(app);

        // if(password===confirmpassword){}
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 

                const user = userCredential.user;
                const userData = {
                    email: user.email,
                    profilePicUrl: '',
                    bio: 'Hi , I am using it.',
                    id: user.uid
                }
                setDoc(doc(fireDb, 'users', user.uid), userData);
                dispatch({ type: 'hideLoading' });
                toast.success('Registration Success ');
                navigate('/login')

            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed !!!!!! ');

                dispatch({ type: 'hideLoading' });
            });
    }

    useEffect(()=>{
        if(localStorage.getItem('my-social')){
            navigate('/')
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
                    <input type='text'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder='Email'
                        className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5"></input>
                    <input type='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder='Password'
                        className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5"></input>
                    <input type='password'
                        value={confirmpassword}
                        onChange={(e) => { setComfirmPassword(e.target.value) }}
                        placeholder='Confirm Password'
                        className="border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5"></input>

                    <div className='flex justify-end'>
                        <button onClick={register} className=" bg-primary h-10 rounded-sm px-10 text-white">Register</button>
                    </div>
                    <hr></hr>
                    <Link to='/login' className='text-[14px] text-primary '>If you Registered Please ? Login </Link>


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

export default Registration;