import React, { useState, useEffect } from "react";
import "../stylings/Search.css";
import { db } from "../firebase";
// import Feed from "./Feed.js";
import Post from "./Post";
// import Grade1 from "./GradesLevelForSearch.css/Grade1";

//  Material-UI
import SearchIcon from "@material-ui/icons/Search";
// import ClearIcon from "@material-ui/icons/Clear";
import { Link } from "react-router-dom";
// .doc(postId)
function Search() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  //  clear the search input
  // const clearSearchInput = (e) => {
  //   e.preventDefault();
  //   setSearchTerm("");
  // };

  useEffect(() => {
    db.collection("posts")
      // .where("booksGrade", "==", searchTerm)
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
      <br />

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

      {/* {Feed.filter((item) => {
        let x = { message };
        if (searchTerm == "") {
          return item;
        } else if (item.x.includes(searchTerm)) {
          return item;
        }
      })} */}

      {/* <Feed /> */}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Search;
