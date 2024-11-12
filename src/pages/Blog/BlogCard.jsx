import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card border border-gray-300 rounded-lg shadow-lg p-4 m-4">
      {/* Blog Title */}
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      
      {/* Blog Slug */}
      <p className="text-sm text-gray-500 mb-2">Slug: {blog.blogSlug}</p>
      
      {/* Blog Description */}
      <p className="text-gray-700 mb-4">{blog.description}</p>
      
      {/* Blog Content (truncated for preview) */}
      <p className="text-gray-600">
        {blog.content?.length > 100 ? blog.content.slice(0, 100) + '...' : blog.content}
      </p>

      {/* Blog Author */}
      <div className="text-sm text-gray-600 mt-4">
        <p>Author: {blog.user?.name || 'Unknown Author'}</p>
        <p>Email: {blog.user?.email || 'No email available'}</p> {/* Safe access for email */}
      </div>

      {/* Blog Creation and Update Dates */}
      <div className="text-xs text-gray-500 mt-2">
        <p>Created At: {blog.createAt ? new Date(blog.createAt).toLocaleDateString() : 'Unknown date'}</p>
        <p>Updated At: {blog.updateAt ? new Date(blog.updateAt).toLocaleDateString() : 'Unknown date'}</p>
      </div>
    </div>
  );
};

export default BlogCard;
