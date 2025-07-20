import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import './Leaderboard.css';

const placeholderAvatars = [
  'https://i.pravatar.cc/100?img=1',
  'https://i.pravatar.cc/100?img=2',
  'https://i.pravatar.cc/100?img=3',
];

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  if (loading) return <div className="leaderboard-loading">Loading...</div>;

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <div className="leaderboard-top3">
        {top3.map((user, idx) => (
          <div key={user._id} className={`leaderboard-top leaderboard-top-${idx + 1}`}> 
            <img src={placeholderAvatars[idx]} alt="avatar" className="leaderboard-avatar" />
            <div className="leaderboard-name">{user.name}</div>
            <div className="leaderboard-points">{user.totalPoints.toLocaleString()}</div>
            <div className="leaderboard-rank-icon">{idx === 0 ? '👑' : '🏆'}</div>
          </div>
        ))}
      </div>
      <div className="leaderboard-list">
        {rest.map((user, idx) => (
          <div key={user._id} className="leaderboard-row">
            <span className="leaderboard-rank">{idx + 4}</span>
            <span className="leaderboard-row-avatar"><img src={`https://i.pravatar.cc/40?img=${idx + 4}`} alt="avatar" /></span>
            <span className="leaderboard-row-name">{user.name}</span>
            <span className="leaderboard-row-points">{user.totalPoints.toLocaleString()}</span>
            <span className="leaderboard-row-trophy">🏆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard; 