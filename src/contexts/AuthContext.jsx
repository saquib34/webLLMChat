// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    if (user) {
      // Get user metadata
      setUserMetadata({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.primaryEmailAddress?.emailAddress,
        profileImage: user.profileImageUrl,
      });
    } else {
      setUserMetadata(null);
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  const value = {
    user: userMetadata,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
