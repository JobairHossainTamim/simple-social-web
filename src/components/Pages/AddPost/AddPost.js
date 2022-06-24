import React, { useState } from 'react';
import DefaultLayout from '../../DefaultLayout/DefaultLayout';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from 'react-toastify';
import { fireDb } from '../../../firebase.config';
import { useDispatch } from 'react-redux';
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const AddPost = () => {

  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onImageChange = (e) => {
    setImage(e.target.files[0])
  }


  const addData = () => {
    dispatch({ type: 'showLoading' })
    const storage = getStorage();
    const storageRef = ref(storage, `/posts/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(ref(storage, `/posts/${image.name}`)).then((url) => {

        addDoc(collection(fireDb, 'post'), {
          description,
          imageUrl: url,
          likes: [],
          comments: [],
          user: JSON.parse(localStorage.getItem('my-social')),

        }).then(() => {
          setDescription('');
          setImage('');
          toast.success('Add data Success');
          dispatch({ type: 'hideLoading' })
          navigate('/')
        }).catch(() => {
          toast.success('Failed !');
          dispatch({ type: 'hideLoading' })
        })
      });

    })
      .catch((err) => {

        toast.error('Operation Failed' + err);
        dispatch({ type: 'hideLoading' })

      })

  }

  return (
    <div >
      <DefaultLayout>
        <div className='flex flex-col justify-start'>
          <h1 className=' flex  justify-start  text-3xl text-gray-600'>Add New Post </h1>

          <div className='w-screen flex-col justify-start '>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className=' flex  justify-start w-1/2 border-dashed border-gray-600 border-2 md:w-full my-5 p-5' rows='3'></textarea>
            <input type='file' className='flex  justify-start  ' onChange={(e) => { onImageChange(e) }}></input>
            {
              image && (
                <img src={URL.createObjectURL(image)} alt='' className='mt-5 h-52 w5' />
              )
            }

          </div>
          {description && image && (
            <button onClick={addData} className='bg-primary h-10 rounded-sm text-white px-10'>Add Data</button>
          )}
        </div>
      </DefaultLayout>
    </div>
  );
};

export default AddPost;