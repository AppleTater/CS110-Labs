import React, { useState } from "react";
import './Comment.css';
import NewPost from '../NewPost/NewPost.js';
import Vote from '../Voting/Vote.js';

const Comment = ({ name, post, depth }) => {
  const [newReply, setNewReply] = useState(false);
  const [replies, setReplies] = useState([]);

  const createReply = () => {
    setNewReply(newReply ? false : true);
  };

  const setReply = (name, post, depth) => {
    setNewReply(false);
    setReplies(replies.concat( < Comment name={name} post={post} depth={depth} /> ));
  };

  return (
    <div className="post">
      <h3 className="name">{name}</h3>
      <p className="post-content">{post}</p>
      <Vote />
      <div className="replies">{replies}</div>
        {depth < 3 && (<button className="reply" onClick={createReply}> Reply </button>)}
        {newReply && (<div className="new_reply"> <NewPost createPost={setReply} depth={depth + 1} /> </div>)}
    </div>
  );
};

export default Comment;
