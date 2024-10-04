"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';

export default function Home() {
  const [postData, setPostData] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);

    } catch(error) {
      console.log("Error loading posts: ", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newStatus }),
    });
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto p-6 bg-gray-100 min-h-screen">
  <h3 className="text-3xl font-semibold text-gray-800 mb-6">NextJS TODO CRUD</h3>
  <hr className="my-3" />
  
  <button className="bg-indigo-600 hover:bg-indigo-500 p-3 text-white rounded-lg shadow-md transition duration-300 ease-in-out">
    <Link href="/create">+ สร้างโพสต์</Link>
  </button>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
    {postData && postData.length > 0 ? (
      postData.map(val => (
        <div key={val._id} className="bg-white shadow-xl p-6 rounded-lg transform transition hover:scale-105 duration-300 ease-in-out">
          <h4 className={`text-2xl font-bold mb-2 ${val.status === 'completed' ? 'line-through text-green-500' : 'text-gray-800'}`}>
            {val.title}
          </h4>
          <p className="text-gray-600">{val.content}</p>
          <p className="text-sm text-gray-500">Due: {val.duedate}</p>
          <p className="mt-3">
            สถานะ: 
            <span className={`${val.status === 'completed' ? 'text-green-500' : 'text-red-500'} font-semibold`}>
              {val.status === 'completed' ? ' เสร็จแล้ว' : ' ยังไม่เสร็จ'}
            </span>
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => handleStatusChange(val._id, val.status === 'completed' ? 'not completed' : 'completed')}
              className={`py-2 px-4 rounded-md font-semibold text-white transition duration-300 ease-in-out ${val.status === 'completed' ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-blue-500 hover:bg-blue-400'}`}>
              {val.status === 'completed' ? 'ทำให้ไม่เสร็จ' : 'ทำให้เสร็จ'}
            </button>
            <div className="flex gap-2">
              <Link className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded-md text-lg" href={`/edit/${val._id}`}>แก้ไข</Link>
              <DeleteBtn id={val._id} />
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="bg-gray-300 p-4 text-center rounded-lg">ไม่มีโพสต์ที่เเสดง</p>
    )}
  </div>
</main>

  );
}
