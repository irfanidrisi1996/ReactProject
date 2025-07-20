import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost/userproject/users.php';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const handleAddUser = async (user) => {
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error('Failed to add user');
      await fetchUsers();
      toast.success('User created successfully!');
    } catch (err) {
      setError('Failed to add user');
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  // Update user
  const handleUpdateUser = async (user) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error('Failed to update user');
      setEditingUser(null);
      await fetchUsers();
      toast.success('User updated successfully!');
    } catch (err) {
      setError('Failed to update user');
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      await fetchUsers();
      toast.success('User deleted successfully!');
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h2>User Management</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {editingUser ? (
        <UserForm
          onSubmit={handleUpdateUser}
          initialValues={editingUser}
          editing={true}
        />
      ) : (
        <UserForm onSubmit={handleAddUser} editing={false} />
      )}
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      )}
      {editingUser && (
        <button onClick={() => setEditingUser(null)} style={{ marginTop: 10 }}>Cancel Edit</button>
      )}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default App;
