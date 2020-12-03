import { Router, Link } from "@reach/router";
import Home from "./pages/home";
import NoPath from "./pages/404";
import "./App.scss";

const App = () => (
  <div className="App">
    <header className="header">
      <Link className="title-link" to="/">
        <h1>FAST Assessment</h1>
        <span className="slider" />
      </Link>
      <Link className="home-link" to="/">
        Home
      </Link>
    </header>
    <div className="content">
      <Router>
        <Home path="/" />
        <NoPath path="*" />
      </Router>
    </div>
  </div>
);

export default App;
