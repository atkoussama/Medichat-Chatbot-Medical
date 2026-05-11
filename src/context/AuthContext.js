import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from local storage
    const user = localStorage.getItem('medichat_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem('medichat_user', JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('medichat_user');
    setCurrentUser(null);
  };

  // Update user profile
  const updateUser = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData };
    localStorage.setItem('medichat_user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return currentUser !== null;
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
