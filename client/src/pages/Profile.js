import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Mail, MapPin, Calendar } from 'lucide-react';
import PostCard from '../components/Posts/PostCard';
import api from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const [userResponse, postsResponse] = await Promise.all([
        api.get(`/users/${userId}`),
        api.get(`/posts/user/${userId}`)
      ]);
      
      setUser(userResponse.data);
      setPosts(postsResponse.data);
    } catch (error) {
      toast.error('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
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

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-start space-x-6">
          <div className="bg-primary-600 w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="text-white" size={40} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Posts by {user.name}
          </h2>
          <p className="text-gray-600 mt-1">{posts.length} posts</p>
        </div>
        
        <div className="divide-y">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post._id} className="p-6">
                <PostCard post={post} onDelete={handleDeletePost} />
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <User className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;