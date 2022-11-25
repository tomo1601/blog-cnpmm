import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthAdmin from './views/AuthAdmin'
import Homepage from "./views/Homepage"
import AuthContextProvider from "./contexts/AuthContext"
import PostContextProvider from "./contexts/PostContext"
import About from './views/About'
import PostDetail from './components/layout/PostDetail'
import Write from './views/Write'
import Settings from './views/Settings'
import ProfilePage from './views/ProfilePage'
import ChangePassWord from './views/ChangePassWord'
import { ToastProvider } from './contexts/ToastProvider';
import PageNotFound from './views/PageNotFound';
import ProtectedRoute from "./components/routing/ProtectedRoute";
import SearchFilter from './views/SearchFilter'
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
              <Route exact path='/admin' render={props => <AuthAdmin {...props} authRoute='admin' />} />
              <Route exact path='/homepage' component={Homepage} />
              <Route exact path='/about' component={About} />
              <Route exact path='/search' component={SearchFilter}/>
              <ProtectedRoute exact path='/post/:id' component={PostDetail} />
              <ProtectedRoute exact path='/write' component={Write} />
              <ProtectedRoute exact path='/settings' component={Settings} />
              <ProtectedRoute exact path='/profile' component={ProfilePage} />
              <ProtectedRoute exact path='/changepassword' component={ChangePassWord}/>
              <Route path="/" component={PageNotFound} />

            </Switch>
          </Router>
        </ToastProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
