import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Plus } from "lucide-react";
import axios from 'axios';
import parse from "html-react-parser"; 
import { generateSlug } from "../../utils/generateSlug"; // Ensure this is imported correctly

export default function BlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  // Function to generate slug
  function handleTitle(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const autoSlug = generateSlug(newTitle);
    setSlug(autoSlug);
  }

  // Handle blog submission
  async function handleSubmit(e) {
    e.preventDefault();
    
    const newBlog = {
      title,
      slug,
      description,
      content,
    };

    try {
      const token = localStorage.getItem('accessToken'); // If you need authentication
      const response = await axios.post('/Blog', newBlog, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token if API is protected
        }
      });

      if (response.status === 201) {
        // Blog creation successful
        console.log('Blog created successfully:', response.data);
        // Optionally clear the form after submitting
        setTitle('');
        setSlug('');
        setDescription('');
        setContent('');
      } else {
        console.error("Blog creation failed:", response.status);
      }
    } catch (error) {
      console.error("Error creating blog", error);
    }
  }

  // Custom toolbar for Quill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  return (
    <div>
      <h2 className="text-4xl text-center font-semibold py-4">
        Blog Editor
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-4">
        {/* Blog Editor Form */}
        <div className="w-full max-w-3xl p-5 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5">
            Create a New Blog Post
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Title */}
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitle}
                  className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>

              {/* Slug */}
              <div className="sm:col-span-2">
                <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Blog Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Blog Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Content */}
              <div className="sm:col-span-2">
                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Blog Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-800"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Blog Post
            </button>
          </form>
        </div>

        {/* Blog View */}
        <div className="w-full max-w-3xl p-8 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5">
            Preview Blog
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Blog Title
              </h2>
              <p className="text-2xl font-bold">{title}</p>
            </div>
            <div className="sm:col-span-2">
              <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Blog Slug
              </h2>
              <p>{slug}</p>
            </div>
            <div className="sm:col-span-2">
              <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Blog Description
              </h2>
              <p>{description}</p>
            </div>
            <div className="sm:col-span-full">
              <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Blog Content
              </h2>
              {parse(content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
