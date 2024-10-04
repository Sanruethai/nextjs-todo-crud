"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function CreatePostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [duedate, setDueDate] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !duedate) {
            alert("Please complete all inputs.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content, duedate })
            });

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create a post");
            }
        } catch (error) {
            const errorData = await res.json();
            console.error("Error creating post:", errorData);
            alert("Failed to create a post. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-100 to-teal-100 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">สร้างงานใหม่</h3>
            <hr className="mb-6 border-gray-300" />

                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className='w-full block bg-gray-100 border border-gray-300 py-2 px-3 rounded text-lg my-2'
                        placeholder='ชื่อของงาน'
                        required
                    />
                    <textarea
                        onChange={(e) => setContent(e.target.value)}
                        className='w-full block bg-gray-100 border border-gray-300 py-2 px-3 rounded text-lg my-2'
                        placeholder='รายละเอียดงาน'
                        rows="4"
                        required
                    ></textarea>

                    <input
                        onChange={(e) => setDueDate(e.target.value)}
                        type="datetime-local"
                        className='w-full block bg-gray-100 border border-gray-300 py-2 px-3 rounded text-lg my-2'
                        required
                    />

                    <button type='submit' className='w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-teal-500 hover:to-teal-700 transition duration-300'>สร้างโพสต์</button>
                </form>
                <Link href="/" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded text-lg my-2 text-center w-full hover:bg-gray-600 transition duration-200'>กลับไปหน้าโพสต์</Link>
            </div>
        </div>
    )
}

export default CreatePostPage;
