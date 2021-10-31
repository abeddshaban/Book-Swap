import "../stylings/Feed.css";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db } from "../firebase";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="feed">
      {/* <div className="feed__inputContainer">
        <div className="feed__title">
          <h2>home page</h2>
        </div>
      </div> */}

      <FlipMove>
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
      </FlipMove>
    </div>
  );
}

export default Feed;
