import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../DefaultLayout/DefaultLayout';
import { useDispatch } from 'react-redux';
import { getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { fireDb } from '../../../firebase.config';
import { useParams,  useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import { toast } from 'react-toastify';


const SharePost = () => {
  const navigate=useNavigate();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [selectedUsers, setSelectedUser] = useState([]);
  const params = useParams();
  const getData = async () => {
    dispatch({ type: 'showLoading' });
    const querySnapshot = await getDocs(collection(fireDb, "users"));
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
    getPost();
  }, [])
  // 
  const getUserName = (text) => {
    const email = text;
    const userName = email.substring(0, email.length - 10)
    return userName
  }

  const getPost = () => {
    dispatch({ type: 'showLoading' });
    getDoc(doc(fireDb, 'post', params.id)).then((response) => {
      setPost({ ...response.data(), id: response.id });

      dispatch({ type: 'hideLoading' });
    })
  }

  const Share = () => {
    dispatch({type:"showLoading"})
    selectedUsers.forEach((user) => {
      const tempShares = user.shares ?? []
      tempShares.push({ ...post, sharedBy: JSON.parse(localStorage.getItem('my-social')) });
       setDoc(doc(fireDb, "users", user.id), { ...user, shares: tempShares }).then(()=>{
        dispatch({type:"hideLoading"})
       });


    })

    toast.success("Share Success");
    navigate('/')
    
  }

  // Add or remove user

  const AddorRemoveUser = (user) => {
    let temp = [...selectedUsers]
    if (selectedUsers.find((obj) => obj.id === user.id)) {
      temp = temp.filter((obj) => obj.id !== user.id)
    }
    else {
      temp.push(user)
    }

    setSelectedUser(temp);
  }

  return (
    <DefaultLayout>
      {post && data && (
        <div>
          <div className='my-5'>
            <img src={post.imageUrl} alt="dd" className='h-52 w-52'></img>
          </div>
          <hr></hr>
          <h1 className='text-xl font-semibold'>Select Users</h1>
          <div className='grid grid-cols-5 md:grid-cols-1 p-2'>
            {data.map((user) => {

              const alreadySelected = selectedUsers.find((obj) => obj.id === user.id)
              return (
                <div key={user.id} onClick={() => { AddorRemoveUser(user) }} className={`cursor-pointer card p-5 flex justify-center items-center flex-col ${alreadySelected && `border-4 border-primary`}`}>
                  <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-white mr-2'>
                    <span className='text-2xl'>
                      {getUserName(user.email)[0]}
                    </span>
                  </div>
                  <h1 className='text-xl text-gray-500'>{getUserName(user.email)}</h1>
                </div>
              )

            })}
          </div>
          <div>
            <button className='bg-primary h-10 rounded-sm text-white px-10' onClick={() => { Share() }}>Share Post </button>
          </div>
        </div>
      )}


    </DefaultLayout>

  );
};

export default SharePost;