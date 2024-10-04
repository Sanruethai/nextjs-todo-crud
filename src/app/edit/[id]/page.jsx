"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function EditPostPage({ params }) {

    const { id } = params;

    const [postData, setPostData] = useState("");
    
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newDueDate, setNewDueDate] = useState("");

    const router = useRouter();

    const getPostById = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch a post");
            }

            const data = await res.json();
            console.log("Edit post: ", data);
            setPostData(data);

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [id]);

   
    useEffect(() => {
        if (postData?.post) {
            setNewTitle(postData.post.title);
            setNewContent(postData.post.content);
            setNewDueDate(postData.post.duedate); 
        }
    }, [postData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newContent, newDueDate })
            })

            if (!res.ok) {
                throw new Error("Failed to update post")
            }

            router.refresh();
            router.push("/");

        } catch(error) {
            console.log(error);
        }
    }

  return (
        <div className="min-h-screen bg-gradient-to-r from-green-100 to-teal-100 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">อัพเดทสถานะ</h3>
            <hr className="mb-6 border-gray-300" />
    
            {/* Back Link */}
            <div className="text-right mb-4">
              <Link href="/" className="inline-block bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                กลับ
              </Link>
            </div>
    
            <form onSubmit={handleSubmit}>
              {/* Title Field */}
              <div className="mb-4">
                <label htmlFor="newTitle" className="block text-gray-700 font-medium mb-2">
                  ขื่องานใหม่
                </label>
                <input
                  id="newTitle"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  placeholder="ป้อนขื่องานใหม่ของคุณ"
                />
              </div>
    
              {/* Content Field */}
              <div className="mb-4">
                <label htmlFor="newContent" className="block text-gray-700 font-medium mb-2">
                  รายละเอียดงานใหม่
                </label>
                <textarea
                  id="newContent"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 h-32 resize-none"
                  placeholder="ป้อนรายละเอียดงานใหม่ของคุณ"
                ></textarea>
              </div>
    
              {/* Due Date Field */}
              <div className="mb-6">
                <label htmlFor="newDueDate" className="block text-gray-700 font-medium mb-2">
                  กำหนดวันที่ต้องทำใหม่
                </label>
                <input
                  id="newDueDate"
                  type="datetime-local"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  required
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                />
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-teal-500 hover:to-teal-700 transition duration-300"
              >
                แก้ไข
              </button>
            </form>
          </div>
        </div>
      );
}

export default EditPostPage
