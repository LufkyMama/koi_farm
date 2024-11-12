import  { useEffect, useState } from 'react';
import api from '../../config/axios';
import BlogCard from './BlogCard'; 

const UserBlogPage = () => {
  const [blogs, setBlogs] = useState([]); 
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/Blog'); 
          setBlogs(response.data); 

      } catch (error) {
        console.log('Can not fetch api blog' , error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => <BlogCard key={blog.blogId} blog={blog} />)
      )}
    </div>
  );
};

export default UserBlogPage;
