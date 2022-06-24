import React from 'react';
import Navbar from './../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Loader from './../Loader/Loader';

const DefaultLayout = (props) => {
    const{loading}=useSelector(store=>store)
    return (
        <div className='mx-20 my-5 md:mx-5 '>
            {loading && <Loader></Loader>}
            <Navbar></Navbar>
            <div className='content mt-5 border-2 rounded-md p-5  '>
                {props.children}
            </div>
        </div>
    );
};

export default DefaultLayout;