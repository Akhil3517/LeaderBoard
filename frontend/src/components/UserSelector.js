import React, { useEffect, useState } from 'react';
import { getUsers, addUser } from '../services/api';
import './UserSelector.css';

function UserSelector({ selectedUserId, onSelect, onUserAdded }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, [onUserAdded]);

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    setAdding(true);
    setError('');
    const res = await addUser(newUser.trim());
    if (res.error) setError(res.error);
    else {
      setNewUser('');
      onUserAdded && onUserAdded();
    }
    setAdding(false);
  };

  return (
    <div className="user-selector-container">
      <select
        className="user-selector-dropdown"
        value={selectedUserId || ''}
        onChange={e => onSelect(e.target.value)}
      >
        <option value="" disabled>Select a user</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
      <div className="user-selector-add">
        <input
          type="text"
          placeholder="Add new user"
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
          disabled={adding}
        />
        <button onClick={handleAddUser} disabled={adding || !newUser.trim()}>
          {adding ? 'Adding...' : 'Add'}
        </button>
      </div>
      {error && <div className="user-selector-error">{error}</div>}
    </div>
  );
}

export default UserSelector; 