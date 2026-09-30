import { Link } from "react-router";

export default function Home() {
  return (
    <div className="div-home">
      <h1>Where's Waldo?</h1>
      <Link className="btn" to="play/1">Play</Link>
      <Link className="btn" to="/leaderboard">Leaderboard</Link>
    </div>
  )
}
