import React, { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../App.css";

const ProfilePage = () => {
  const { currentUser, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    language: currentUser?.language || "en-US",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    updateUser({
      name: formData.name,
      email: formData.email,
      language: formData.language,
      ...(formData.password ? { password: formData.password } : {})
    });
    setMessage("Profile updated successfully.");
  };

  return (
    <div className="profile-page-container">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Preferred Language:</label>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
        >
          <option value="en-US">English</option>
          <option value="fr-FR">Français</option>
          <option value="ar-SA">العربية</option>
        </select>
        <label>New Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
        {message && <p className="profile-message">{message}</p>}
      </form>
    </div>
  );
};

export default ProfilePage;
