import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AdminLoginForm from './components/auth/AdminLoginForm'
import Homepage from "./views/Homepage"
import AuthContextProvider from "./contexts/AuthContext"
import PostContextProvider from "./contexts/PostContext"
import About from './views/About'
import PostDetail from './components/layout/PostDetail'
import Profile from './components/layout/Profile'
import Write from './views/Write'
import Settings from './views/Settings'
import ProfilePage from './views/ProfilePage'
import { ToastProvider } from './contexts/ToastProvider';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <ToastProvider>
          <Router>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
              <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} />
              <Route exact path='/admin' component={AdminLoginForm} />
              <Route exact path='/homepage' component={Homepage} />
              <Route exact path='/about' component={About} />
              <Route exact path='/post/:id' component={PostDetail} />
              <Route exact path='/user/:id' component={Profile} />
              <Route exact path='/write' component={Write} />
              <Route exact path='/settings' component={Settings} />
              <Route exact path='/profile' component={ProfilePage} />
            </Switch>
          </Router>
        </ToastProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
