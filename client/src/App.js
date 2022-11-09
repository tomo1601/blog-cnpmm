import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AdminLoginForm from './components/auth/AdminLoginForm'
import Homepage from "./views/Homepage";
import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
          <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} />
          <Route exact path='/admin' component={AdminLoginForm} />
          <Route exact path='/homepage' component={Homepage} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
