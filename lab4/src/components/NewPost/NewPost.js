import React, { useState } from "react";
import './NewPost.css'

const NewPost = ({ createPost, depth }) => {
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  
  const submitPost = () => {
    setName("");
    setPost("");

    createPost( name, post, depth );
  };
  
  return (
    <div className="NewPost">
      <div className="name_submit">
        <input className="Name" type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)}/>
        <button className="submit" onClick={submitPost} disabled={!name || !post}>Submit</button>
      </div>
      <textarea className="Post" placeholder="Write a new post..." value={post} onChange={(e) => setPost(e.target.value)}/>
    </div>
  );
};

export default NewPost;
