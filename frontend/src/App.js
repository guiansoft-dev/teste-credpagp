
import './App.css';
import { BrowserRouter as Router, Route,Switch,withRouter} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
 
function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/" component={Login} />
        <Route exact path="/Signup" component={Signup} />
      </Switch>
    </div>
  </Router>
  );
}
 
export default App;