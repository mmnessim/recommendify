import React, { useEffect } from 'react';
import Profile from './components/profile';
import store from './redux/store';
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const reduxProfile = useSelector(state => state.profile);
  const reduxToken = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxProfile.displayName === "John Doe") {
    fetch('http://localhost:3001/', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({
          type: 'profile/login',
          payload: {
            displayName: data.profile.displayName,
            username: data.profile.id,
            id: data.profile.id
          }
        });
        dispatch({
          type: 'token/login',
          payload: {
            token: data.accessToken
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, [reduxProfile, reduxToken]);

  function handleLogout() {
    fetch('http://localhost:3001/logout', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        store.dispatch({
          type: 'profile/logout'
        })
      })
  }

  function handleLogin() {
    window.location.href = 'http://localhost:3001/auth/spotify';
  }

  return (
    <div className="App">
      <div classname="navbar navbar-inverse navbar-fixed-top" id='nav'>
        <button className='btn' onClick={handleLogin}>Login with Spotify</button>
        <button className='btn' onClick={handleLogout}>Logout</button>
      </div>
      <p>token: {reduxToken}</p>
      <p>profile: {reduxProfile && reduxProfile.displayName}</p>
      <div className="jumbotron"><h1>Recommendify</h1></div>
      { reduxProfile.displayName !== "John Doe" &&
      <div>
        <Profile profile={reduxProfile} token={reduxToken} />
      </div>
       }
    </div>
  );
}

export default App;
