import React from 'react';

export default function UserList({ users, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
   
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr><td colSpan="5">No users found.</td></tr>
        ) : (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
            
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)} style={{ marginLeft: 8 }}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
} 