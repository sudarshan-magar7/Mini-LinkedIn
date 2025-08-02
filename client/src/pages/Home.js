import React, { useState, useEffect } from 'react';
import CreatePost from '../components/Posts/CreatePost';
import PostFeed from '../components/Posts/PostFeed';
import api from '../services/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost onPostCreated={handleNewPost} />
      <PostFeed posts={posts} onDeletePost={handleDeletePost} />
    </div>
  );
};

export default Home;