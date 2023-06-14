import React, { useState } from 'react';
import './App.css';
import NewPost from './components/NewPost/NewPost.js';
import Comment from './components/Comment/Comment.js';

// created by Andre Amante and Jasmine Lau

function App() {
  const [comments, setComments] = useState([]);

  function createPost(name, post, depth) {
    setComments(comments.concat( < Comment name={name} post={post} depth={depth} /> ));
  }

  return (
    <div className="App">
      <div className="New-Post">
        <h1 className="Header">New Post</h1>
        <NewPost createPost={createPost} depth={1} />
      </div>
      <div className="Comment">{comments}</div>
    </div>
  );
};

export default App;
