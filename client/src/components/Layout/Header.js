import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              ConnectHub
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </button>
            
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <User size={20} />
              <span className="hidden sm:inline">{user?.name}</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;