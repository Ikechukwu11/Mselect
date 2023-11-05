import React from 'react';
import "./Menu.css"
import UserContextMenu from './Menu';

const UserList = () => {
  const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
    // Add more user data here...
  ];

  // Functions to handle user actions
  const handleEditUser = (userId) => {
    alert(`Editing user with ID: ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    alert(`Deleting user with ID: ${userId}`);
  };

  // Functions to handle title actions
  const handleRenameTitle = (titleId) => {
    alert(`Renaming title with ID: ${titleId}`);
  };

  return (
    <div className="user-list">
      <h2>
        User List
        <UserContextMenu
          type="title"
          item={{ id: 1 }} // You can pass a unique ID for the title
          menuItems={['Rename']}
          functions={[handleRenameTitle]}
        />
      </h2>
      {users.map((user) => (
        <div key={user.id} className="user">
          <span>{user.name}</span>
          <span>{user.email}</span>
          <UserContextMenu
            type="user"
            item={user}
            menuItems={['Edit', 'Delete']}
            functions={[handleEditUser, handleDeleteUser]}
          />
        </div>
      ))}
    </div>
  );
};

export default UserList;
