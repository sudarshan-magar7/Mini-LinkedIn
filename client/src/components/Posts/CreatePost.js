import React, { useState } from 'react';
import { Plus, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await api.post('/posts', { content });
      onPostCreated(response.data);
      setContent('');
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start space-x-4">
        <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="text-white" size={24} />
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts with the community..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-colors"
              rows="4"
              maxLength="1000"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {content.length}/1000 characters
              </span>
              <button
                type="submit"
                disabled={!content.trim() || isLoading}
                className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <Plus size={20} />
                <span>{isLoading ? 'Posting...' : 'Post'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;