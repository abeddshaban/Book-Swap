import React, { useState, useEffect } from "react";
import "../../stylings/Post.css";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import Post from "../Post";

function PostId({ match }) {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  // console.log(match);
  // console.log(match.params.postId);

  let x = match.params.postId;
  useEffect(() => {
    db.collection("posts")
      .where("postId", "==", x)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [user, x]);

  return (
    <div className="postId__page">
      {posts.map(
        ({
          id,
          data: {
            name,
            description,
            message,
            photoURL,
            postId,
            imageUrl,
            booksGrade,
            price,
            priceStatus,
            phoneNb,
            quality,
            // timestamp,
          },
        }) => (
          <Post
            postId={postId}
            key={id}
            name={name}
            description={description}
            message={message}
            photoURL={photoURL}
            imageUrl={imageUrl}
            booksGrade={booksGrade}
            price={price}
            priceStatus={priceStatus}
            phoneNb={phoneNb}
            quality={quality}
            // timestamp={timestamp}
          />
        )
      )}
    </div>
  );
}

export default PostId;
