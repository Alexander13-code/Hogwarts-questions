import { Link } from "react-router-dom";
import '../App.css'

export default function Header() {

  return (
      <div className="container" >
        <h1>Which Element Are You ??</h1>
        <p>(based on completely random things)</p>
        <div className="link">
          <Link to="/">Home</Link>
          <Link to="/quiz">Quiz</Link>
        </div>
      </div>
  )
}
