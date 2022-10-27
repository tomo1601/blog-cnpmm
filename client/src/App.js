import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AdminLoginForm from './components/auth/AdminLoginForm'
import DashBoard from "./views/DashBoard";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/login' render={props => <Auth {...props} authRoute='login'/>}/>
          <Route exact path='/register' render={props => <Auth {...props} authRoute='register'/>}/>
          <Route exact path='/admin' component={AdminLoginForm}/>
          <Route exact path='/dashboard' component={DashBoard}/> 
        </Switch>
      </Router>
  );
}

export default App;
