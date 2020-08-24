import React from 'react';

function Home() {
  return (
    <div className="home">
      <h1>Thank you for Your Submission!</h1>
      <h2>What else would you like to do?</h2>
      <div>
        <a href="./leagues">Take me to Add a League</a><br/>
        <a href="./sponsor">Take me to Find Leagues to Sponsor</a>
      </div>
    </div>
  );
}

export default Home;