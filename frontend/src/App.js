import React, { useState, useCallback } from 'react';
import Leaderboard from './components/Leaderboard';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import './App.css';
import './components/Leaderboard.css';
import './components/UserSelector.css';
import './components/ClaimButton.css';

function App() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Refresh leaderboard and user list after claim or add
  const handleRefresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <div className="app-bg">
      <div className="app-container">
        <UserSelector
          selectedUserId={selectedUserId}
          onSelect={setSelectedUserId}
          onUserAdded={handleRefresh}
          key={refreshKey + '-selector'}
        />
        <ClaimButton
          selectedUserId={selectedUserId}
          onClaim={handleRefresh}
          key={refreshKey + '-claim'}
        />
        <Leaderboard key={refreshKey + '-leaderboard'} />
      </div>
    </div>
  );
}

export default App;
