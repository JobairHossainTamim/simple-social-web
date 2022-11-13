import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CgMenuRightAlt } from 'react-icons/cg'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const user = JSON.parse(localStorage.getItem("my-social"));

    const menuItem = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'Add Post',
            path: '/addPost'
        },
        {
            title: 'Shares',
            path: '/shares'
        },
        {
            title: 'Profile',
            path: `/profile/${user.id}`
        },

    ];

    return (
        <div className='p-5 bg-primary rounded-md '>

            {
                !showMenu && (
                    <div className='md:flex justify-end  hidden  bg-primary -mb-8'>
                        <CgMenuRightAlt size={30} color='white' className='cursor-pointer' onClick={() => setShowMenu(true)}></CgMenuRightAlt>
                    </div>
                )
            }
            <div className='flex items-center justify-between'>

            <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl font-semibold text-white">TGram</h1>
          <span className="text-gray-500">
            {user.email.substring(0, user.email.length - 10)}
          </span>
        </div>


                {/* web view */}
                <div className='flex space-x-10 justify-end item-center  md:hidden'>
                    {menuItem.map((item,index) => {
                        return <Link to={`${item.path}`} key={index} className={`text-gray-200 ${item.path === location.pathname && 'bg-white text-black rounded px-3 py-1'} `}>{item.title}</Link>
                    })}
                    <h1
                        className="text-gray-200 cursor-pointer"
                        onClick={() => {
                            localStorage.removeItem("my-social");
                            navigate("/login");
                        }}
                    >
                        Logout
                    </h1>
                </div>
                {/* Mobile   */}
                {
                    showMenu && (<div className='md:flex space-x-10 justify-end item-center md:flex-col md:items-end md:space-y-5 hidden'>
                        {menuItem.map((item) => {
                            return <Link
                                to={`${item.path}`}
                                className={`text-gray-200 ${item.path === location.pathname && 'bg-white text-black rounded px-3 py-1'} `}
                                onClick={() => setShowMenu(false)}



                            >{item.title}</Link>
                        })}

                        <h1
                            className="text-gray-200 cursor-pointer"
                            onClick={() => {
                                localStorage.removeItem("my-social");
                                navigate("/login");
                            }}
                        >
                            Logout
                        </h1>
                    </div>)
                }
            </div>



        </div>
    );
};

export default Navbar;