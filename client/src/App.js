import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Header from './components/Header';
import books from './data/books.json';
import audios from './data/audios.json';
import videos from './data/videos.json';
import schedules from './data/schedules.json';

import Home from './pages/Home';
import Main from './pages/Main';
import Explain from './pages/Explain';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';

function App() {
  const tokenstorge = localStorage.getItem('token')
  const [registration, setRegistration] = useState("Home");
  // const [isLogin, setIsLogin] = useState(false) // not work
  const [token, setToken] = useState(tokenstorge);

  // console.log(tokenstorge)
  // if ((tokenstorge)) {
  //   setIsLogin(true)
  // }

  const toggleRegistration = (page) => {
    setRegistration(page)
  }

  const logout = () => {
    localStorage.clear()
    setToken()
    setRegistration("Home")
  }

  if (!token) {
    return (
      <>
        {registration === "Home" && <Home toggleRegistration={toggleRegistration} />}
        {registration === "login" && <Login setToken={setToken} toggleRegistration={toggleRegistration} />}
        {registration === "signUp" && <SignUp setToken={setToken} toggleRegistration={toggleRegistration} />}
      </>
    )
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Route
          exact
          path="/"
          render={() => (<Main books={books} audios={audios} />)}
        />
        <Route
          exact
          path="/explain"
          render={() => (<Explain items={videos} />)}
        />
        <Route
          exact
          path="/schedule"
          render={() => (<Schedule items={schedules} />)}
        />
        <Route
          exact
          path="/profile"
          render={() => (<Profile token={token} logout={logout} />)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
