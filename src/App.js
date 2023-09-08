import React, { useState, useEffect } from 'react';
import Profile from './components/profile';
import store from './redux/store';


function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setToken(data.accessToken);
        setProfile(data.profile);
      })
      .catch(err => console.log(err));
  }, []);

  function handleLogout() {
    fetch('http://localhost:3001/logout', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setToken(null);
        setProfile(null);
        store.dispatch({
          type: 'profile/logout'
        })
      })
  }

  function handleLogin() {
    window.location.href = 'http://localhost:3001/auth/spotify';
  }

  function dispatchLogin() {
    if (profile) {
      store.dispatch({
        type: 'profile/login',
        payload: {
          displayName: profile.displayName,
          username: profile.id,
          id: profile.id
        }
      })
      console.log(store.getState())
    }}

  function dispatchToken() {
    if (token) {
      store.dispatch({
        type: 'token/login',
        payload: {
          token: token
        }
      })
      console.log(store.getState())
    }
  }

  useEffect(() => {
    if (profile) {
      dispatchLogin();
      dispatchToken();
    }

  }, [profile]);

  return (
    <div className="App">
      <div classname="navbar navbar-inverse navbar-fixed-top" id='nav'>
        <button className='btn' onClick={handleLogin}>Login with Spotify</button>
        <button className='btn' onClick={handleLogout}>Logout</button>
        <button className='btn' onClick={dispatchLogin}>Update store</button>
      </div>
      <div className="jumbotron"><h1>Recommendify</h1></div>
      { profile &&
      <div>
        <Profile profile={profile} token={token} />
      </div>
       }
      {
        store.getState().profile.displayName &&
        <div>
          <h1>Redux</h1>
          <p>Display name: {store.getState().profile.displayName}</p>
          <p>Username: {store.getState().profile.username}</p>
          <p>ID: {store.getState().profile.id}</p>
          <p>Token: {store.getState().token.token}</p>
        </div>
      }

    </div>
  );
}

export default App;
