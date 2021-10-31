import React, { useEffect } from "react";
import "./stylings/App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import { Route, Switch } from "react-router-dom";
import Home from "./AppComponents/Home";
import Search from "./AppComponents/Search";
import Upload from "./AppComponents/Upload";
import Message from "./AppComponents/Message";
import Profile from "./AppComponents/Profile";
import NavBar from "./AppComponents/NavBar.js";
import Signup from "./TriplePage/Signup.js";
import WelcomePage from "./TriplePage/WelcomePage.js";
import Login from "./TriplePage/Login";
import UserEditProfileSettings from "./AppComponents/UserEditProfileSettings";
import SettingsPage from "./AppComponents/SettingsPage";
import Grade1 from "./AppComponents/GradesLevelForSearch.css/Grade1";
import Grade2 from "./AppComponents/GradesLevelForSearch.css/Grade2";
import Grade3 from "./AppComponents/GradesLevelForSearch.css/Grade3";
import Grade4 from "./AppComponents/GradesLevelForSearch.css/Grade4";
import Grade5 from "./AppComponents/GradesLevelForSearch.css/Grade5";
import Grade6 from "./AppComponents/GradesLevelForSearch.css/Grade6";
import Grade7 from "./AppComponents/GradesLevelForSearch.css/Grade7";
import Grade8 from "./AppComponents/GradesLevelForSearch.css/Grade8";
import Grade9 from "./AppComponents/GradesLevelForSearch.css/Grade9";
import Grade10 from "./AppComponents/GradesLevelForSearch.css/Grade10";
import Grade11 from "./AppComponents/GradesLevelForSearch.css/Grade11";
import Grade12 from "./AppComponents/GradesLevelForSearch.css/Grade12";
import post from "./AppComponents/Post/[postId]";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user is  logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        // user is  logged out
        dispatch(logout());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <div className="app__ body">
        <NavBar />
      </div>

      <Switch>
        <Route path="/post/:postId" component={post} />
        <Route exact path="/welcomePage" component={WelcomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/profile" component={Profile} />
        <Route
          exact
          path="/profile/edit-profile"
          component={UserEditProfileSettings}
        />
        <Route exact path="/profile/settingspage" component={SettingsPage} />
        {/*  */}
        <Route exact path="/search/grade1-books" component={Grade1} />
        <Route exact path="/search/grade2-books" component={Grade2} />
        <Route exact path="/search/grade3-books" component={Grade3} />
        <Route exact path="/search/grade4-books" component={Grade4} />
        <Route exact path="/search/grade5-books" component={Grade5} />
        <Route exact path="/search/grade6-books" component={Grade6} />
        <Route exact path="/search/grade7-books" component={Grade7} />
        <Route exact path="/search/grade8-books" component={Grade8} />
        <Route exact path="/search/grade9-books" component={Grade9} />
        <Route exact path="/search/grade10-books" component={Grade10} />
        <Route exact path="/search/grade11-books" component={Grade11} />
        <Route exact path="/search/grade12-books" component={Grade12} />
      </Switch>
    </div>
  );
}

export default App;
