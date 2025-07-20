import React, { useState } from 'react';
import { claimPoints } from '../services/api';
import './ClaimButton.css';

function ClaimButton({ selectedUserId, onClaim }) {
  const [loading, setLoading] = useState(false);
  const [awarded, setAwarded] = useState(null);
  const [error, setError] = useState('');

  const handleClaim = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    setError('');
    setAwarded(null);
    try {
      const res = await claimPoints(selectedUserId);
      if (res.error) setError(res.error);
      else {
        setAwarded(res.points);
        onClaim && onClaim(res.points);
      }
    } catch (e) {
      setError('Failed to claim points');
    }
    setLoading(false);
  };

  return (
    <div className="claim-btn-container">
      <button
        className="claim-btn"
        onClick={handleClaim}
        disabled={!selectedUserId || loading}
      >
        {loading ? 'Claiming...' : 'Claim Points'}
      </button>
      {awarded !== null && (
        <div className="claim-awarded">+{awarded} points!</div>
      )}
      {error && <div className="claim-btn-error">{error}</div>}
    </div>
  );
}

export default ClaimButton; 