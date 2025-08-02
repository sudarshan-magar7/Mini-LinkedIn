import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Clock, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PostCard = ({ post, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleProfileClick = () => {
    navigate(`/profile/${post.author._id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post._id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="text-white" size={24} />
          </div>
          <div>
            <button
              onClick={handleProfileClick}
              className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
            >
              {post.author.name}
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock size={14} />
              <span>{formatTime(post.createdAt)}</span>
            </div>
          </div>
        </div>
        
        {user && user._id === post.author._id && (
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
      
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>
    </div>
  );
};

export default PostCard;