import React from 'react';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to LeagueSide!</h1>
      <div>
        <a href="./leagues">Take me to Add a League</a><br/>
        <a href="./sponsor">Take me to Find Leagues to Sponsor</a>
      </div>
    </div>
  );
}

export default Home;