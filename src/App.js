import React, { useState, useEffect } from 'react';

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
      <button><a href='http://localhost:3001/auth/spotify'>Click Me</a></button>
      <button onClick={handleLogout}>Logout</button>
      { profile &&
      <div>
        <h1>{profile.displayName}</h1>
        <img src={profile.photos[0]} alt="profile pic" />
      </div>
       }
    </div>
  );
}

export default App;
