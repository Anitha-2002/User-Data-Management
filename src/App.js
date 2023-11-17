// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // State for the account creation form
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    location: '',
    contactDetails: '',
  });

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:5000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAccountCreation = (event) => {
    event.preventDefault();
    // Send the new user data to the backend for creation
    axios.post('http://localhost:5000/api/users', newUser)
      .then((response) => {
        // Handle success (you may want to update the user list or show a success message)
        console.log('User created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>User Management Dashboard</h1>

      {/* User Details Tab */}
      <div>
        <h2>User Details</h2>
        <input
          type="text"
          placeholder="Search by username"
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Account Creation Tab */}
      <div>
        <h2>Account Creation</h2>
        <form onSubmit={handleAccountCreation}>
          <label>Username:
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
            />
          </label>

          <label>Password:
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
          </label>

          <label>First Name:
            <input
              type="text"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
            />
          </label>

          <label>Last Name:
            <input
              type="text"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
          </label>

          <label>Location:
            <input
              type="text"
              name="location"
              value={newUser.location}
              onChange={handleInputChange}
            />
          </label>

          <label>Contact Details:
            <input
              type="text"
              name="contactDetails"
              value={newUser.contactDetails}
              onChange={handleInputChange}
            />
          </label>

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default App;
