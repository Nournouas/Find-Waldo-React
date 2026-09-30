import { useEffect, useState } from 'react'
import { Link } from 'react-router';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  
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

  useEffect(() => {
    async function getScore() {
    const response = await fetch("http://localhost:3000/get-scores", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    setScores(result.rows);
    }
    getScore();
  }, [])
  
  const scoreList = scores.map(score => {
    return <div key={score.id} className='score-container'>
      <h3>{score.name}</h3>
      <h3>{convertScore(score.score)}</h3>
    </div>
  })

  return (
    <div className='leaderboard-page-div'>
      <Link to="/" className='btn'>Go back home</Link>
      <br />
      <Link to="/play/1" className='btn'>Play</Link>
      <br />
      <br />
      <div className='leaderboard'>
        <div className='leaderboard-header'>
          <h2>Name</h2>
          <h2>Score</h2>
        </div>
        {scoreList}
      </div>
    </div>
  )
}
