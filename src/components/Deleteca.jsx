"use client"
import React from 'react';
import axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Deletebutton = ({ id }) => {
  const router = useRouter()

  const deletePost = async (id) => {
    try {
      const confirmMess = window.confirm("are you sure to del this product");
      if (!confirmMess) {
        return
      } else {
        
        const response = await axios.delete(`/api/categories/${id}`);
        console.log('category deleted:', id, response);
        toast.success("deleted")
        router.refresh()
      }

    } catch (error) {
      console.error('Error deleting post:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Toaster/>
      <button className=' active:scale-90 duration-200' onClick={() => deletePost(id)}>
        <i className="bx bxs-trash"></i>
      </button>
    </div>
  );
};


export default Deletebutton;
