import React, { useState, useEffect } from 'react';
import Profile from './components/profile';

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
      })
  }

  return (
    <div className="App">
      <div classname="navbar navbar-inverse navbar-fixed-top" id='nav'>
        <button className='btn' ><a href='http://localhost:3001/auth/spotify'>Click Me</a></button>
        <button className='btn' onClick={handleLogout}>Logout</button>
      </div>

      { profile &&
      <div>
        <Profile profile={profile} token={token} />
      </div>
       }
    </div>
  );
}

export default App;
