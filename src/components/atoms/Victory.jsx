import React from 'react'
import { Link, useNavigate } from 'react-router'

export default function Victory({time}) {
  const navigate = useNavigate();
  
  const round = (n, dp) => {
    const h = +('1'.padEnd(dp + 1, '0')) // 10 or 100 or 1000 or etc
    return Math.round(n * h) / h
  }

  function convertScore(time) {
    let timeInSeconds = time/1000;
    const hours = Math.floor(timeInSeconds / 3600);
    timeInSeconds = timeInSeconds - hours * 3600;
    const minutes = Math.floor(timeInSeconds/60);
    const seconds = timeInSeconds % 60;
    const timePretty = `${hours}h : ${minutes}m : ${round(seconds, 3)}s`
    return timePretty
  }

  async function handleSubmitScore(e){
    e.preventDefault();
    const name = e.currentTarget.elements.username.value;
    const response = await fetch("http://localhost:3000/submit-score", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": name,
      }),
    });
    const result = response.json();
    if (result){
      navigate("/leaderboard");
    }
  }

  return (
    <div className='victory-div'>
      <h1>You Have Won!</h1>
      <h2>You took: {convertScore(time)} to complete this challenge!</h2>
      <div className='horizontal-seperator'></div>
      <h2>Add your socore to our leaderboard</h2>
      <form onSubmit={handleSubmitScore} method='POST'>
        <label htmlFor="name">Name</label>
        <input type="text" id='username' name='name'/>
        <button type="submit">Add My Score</button>
      </form>
      <div className='horizontal-seperator'></div>
      <Link className="btn" to="/">Go back home</Link>
      <Link className="btn" to="/leaderboard">Leaderboard</Link> 
    </div>
  )
}

