import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login.js";
import Home from "./Home.js";
import About from "./About.js";
import Contact from "./Contact.js";
import HandleView from "./HandleView.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/" component={Login} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/view" component={HandleView} />
            <Route path="*">Error 404 :Not Found</Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
