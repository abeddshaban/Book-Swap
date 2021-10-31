import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import Post from "../Post";
import SearchIcon from "@material-ui/icons/Search";

function Grade6() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .where("booksGrade", "==", "gr 6")
      // .orderBy("timestamp", "desc")
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
    <div className="search__page">
      <div className="search__div">
        <form>
          <SearchIcon />
          {/* <input
            className="search__input"
            value={searchTerm}
            placeholder="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button className="search__clearBtn" onClick={clearSearchInput}>
            <ClearIcon className="search__clearIcon" />
          </button> */}
          <section className="flex">
            <Link to="/search/grade1-books">
              <button className="search__btn">gr 1</button>
            </Link>
            <Link to="/search/grade2-books">
              <button className="search__btn">gr 2</button>
            </Link>
            <Link to="/search/grade3-books">
              <button className="search__btn">gr 3</button>
            </Link>
            <Link to="/search/grade4-books">
              <button className="search__btn">gr 4</button>
            </Link>
            <Link to="/search/grade5-books">
              <button className="search__btn">gr 5</button>
            </Link>
            <Link to="/search/grade6-books">
              <button className="search__btn">gr 6</button>
            </Link>

            <Link to="/search/grade7-books">
              <button className="search__btn">gr 7</button>
            </Link>
            <Link to="/search/grade8-books">
              <button className="search__btn">gr 8</button>
            </Link>
            <Link to="/search/grade9-books">
              <button className="search__btn">gr 9</button>
            </Link>
            <Link to="/search/grade10-books">
              <button className="search__btn">gr 10</button>
            </Link>
            <Link to="/search/grade11-books">
              <button className="search__btn">gr 11</button>
            </Link>
            <Link to="/search/grade12-books">
              <button className="search__btn">gr 12</button>
            </Link>
          </section>
        </form>
      </div>
      <h3>search for grade 6 books</h3>
      <hr className="hr__seperate" />

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
          />
        )
      )}
      <h2>nothing here</h2>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Grade6;
