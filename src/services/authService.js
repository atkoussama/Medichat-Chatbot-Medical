import usersData from '../data/users.json';

// Mock function to write to the JSON file
const saveUsers = (users) => {
  localStorage.setItem('medichat_users_db', JSON.stringify(users));
};

// Mock function to read from the JSON file
const getUsers = () => {
  // Try to get users from localStorage first
  const storedUsers = localStorage.getItem('medichat_users_db');
  
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  
  // If no users in localStorage, initialize with our starting data
  localStorage.setItem('medichat_users_db', JSON.stringify(usersData));
  return usersData;
};

// Register a new user
export const register = (username, email, password) => {
  const users = getUsers();
  
  // Check if user already exists
  const userExists = users.some(user => 
    user.email.toLowerCase() === email.toLowerCase() || 
    user.username.toLowerCase() === username.toLowerCase()
  );
  
  if (userExists) {
    return { 
      success: false, 
      message: 'User with this email or username already exists'
    };
  }
  
  // Create new user object
  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    password,
    createdAt: new Date().toISOString()
  };
  
  // Add to users array
  users.push(newUser);
  
  // Save updated users array
  saveUsers(users);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  
  return { 
    success: true,
    user: userWithoutPassword
  };
};

// Login a user
export const login = (email, password) => {
  const users = getUsers();
  
  // Find user by email
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return {
      success: false,
      message: 'Invalid email or password'
    };
  }
  
  // Return user data without password
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    success: true,
    user: userWithoutPassword
  };
};

// Get current user by ID
export const getUserById = (userId) => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return null;
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}; 
