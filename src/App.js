import React, { useEffect } from 'react';
import Profile from './components/profile';
import { useDispatch, useSelector } from 'react-redux';
import About from './components/about';


function App() {
  const reduxProfile = useSelector(state => state.profile);
  const reduxToken = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    //Get user data from backend only if we don't have it already
    if (reduxProfile.displayName === "John Doe") {
    fetch('http://localhost:3001/', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        //Dispatch to redux
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
  }, [reduxProfile, reduxToken, dispatch]);

  function handleLogout() {
    fetch('http://localhost:3001/logout', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({
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
      <div className="jumbotron"><h1>Recommendify</h1></div>
      <About />
      { reduxProfile.displayName !== "John Doe" &&
        <Profile /> 
       }
    </div>
  );
}

export default App;
