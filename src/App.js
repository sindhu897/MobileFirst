import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Login from "./pages/login";
import Tasks from "./pages/tasks";
import Dashboard from './pages/dashboard'
import EditTask from './pages/editTask'
import Jokes from './pages/jokes'
import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'
import { connect } from "react-redux";
import { logout } from './redux/reducer/actions'

const public_routes = (

  <Switch>

    <Route exact path="/">
      <Redirect to="/login" />
    </Route>

    <Route path="/login">
      <Login/>
    </Route>

    <Route>
      <Login/>
    </Route>

  </Switch>

)

const private_routes = (
  <Switch>
    
    <Route path="/dashboard">
      <Dashboard/>
    </Route>
    
    <Route path="/viewTasks">
      <Tasks />
    </Route>

    <Route path="/editTask">
      <EditTask />
    </Route>

    <Route path="/jokes">
      <Jokes />
    </Route>

    <Route>
      <Dashboard/>
    </Route>

  </Switch>
)

function App(props) {

  console.log(props.login)
  return (
    <Router>
      {props.login ?  
      <div className="mb-5">
      <div className="bg-nav p-3">
      <ul className="nav">
          <li className="nav-item">
              <Link className="nav-link" to="/viewTasks">Tasks</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/jokes">Jokes</Link>
          </li>
          <li className="nav-item logout">
              <a className="nav-link pointer" onClick={()=>props.logout()}>Logout</a>
          </li>
      </ul>
    </div>

      {private_routes}</div> : 
      
        public_routes
      }
      </Router>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.reducer.checkLogin
  };
}

const mapDispatchToProps=dispatch=>{
  return{
      logout: ()=>dispatch(logout())
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(App));