import React from 'react';
import PostCard from './PostCard';
import { MessageSquare } from 'lucide-react';

const PostFeed = ({ posts, onDeletePost }) => {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <MessageSquare className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-600">Be the first to share something with the community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div key={post._id} className="bg-white rounded-xl shadow-sm p-6">
          <PostCard post={post} onDelete={onDeletePost} />
        </div>
      ))}
    </div>
  );
};

export default PostFeed;