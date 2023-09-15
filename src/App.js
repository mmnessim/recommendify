import React, { useState, useEffect } from 'react';
import Profile from './components/profile';
import store from './redux/store';
import { handleLogout, handleLogin, dispatchLogin, dispatchToken } from './helper/storeFunctions/loginLogout';


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
        store.getState().profile.displayName !== "John Doe" &&
        <div>
          <h1>Redux</h1>
          <p>Display name: {store.getState().profile.displayName}</p>
          <p>Username: {store.getState().profile.username}</p>
          <p>ID: {store.getState().profile.id}</p>
          <p>Token: {store.getState().token.token}</p>
          <p>PlaylistID: {store.getState().playlistID.playlistID}</p>
        </div>
      }

    </div>
  );
}

export default App;
