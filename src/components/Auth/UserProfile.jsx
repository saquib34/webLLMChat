// src/components/Auth/UserProfile.jsx
import { useUser } from '@clerk/clerk-react';

const UserProfile = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-3 p-2">
        <div className="animate-pulse rounded-full bg-gray-300 dark:bg-gray-700 h-10 w-10"></div>
        <div className="animate-pulse h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3 p-2">
      <div className="relative">
        <img 
          src={user.profileImageUrl}
          alt={`${user.firstName}'s profile`}
          className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-800"
        />
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-sm text-gray-900 dark:text-white">
          {user.firstName} {user.lastName}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
          {user.primaryEmailAddress?.emailAddress}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;