import React, { useState } from 'react';
import './Vote.css';

function Vote() {
  const [votes, setVotes] = useState(0);

  const handleUpvote = () => {
    setVotes(votes + 1);
  };

  const handleDownvote = () => {
    setVotes(votes - 1);
  };

  return (
    <div className="vote-container">
      <button className="vote-button" onClick={handleUpvote}>👍</button>
      <span className="Count"> {votes} </span>
      <button className="vote-button" onClick={handleDownvote}>👎</button>
    </div>
  );
}

export default Vote;