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
import AdminRoute from "./components/routing/AdminRoute";
import Dashboard from './views/admin/Dashboard'
import Team from './views/admin/Team'
import Blog from './views/admin/Blog'
import Category from './views/admin/Category'
import Bar from './views/admin/Bar'
import Form from './views/admin/Form'
import Pie from './views/admin/Pie'
import Line from './views/admin/Line'

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
              <ProtectedRoute exact path='/post/:id' component={PostDetail} />
              <ProtectedRoute exact path='/write' component={Write} />
              <ProtectedRoute exact path='/settings' component={Settings} />
              <ProtectedRoute exact path='/profile' component={ProfilePage} />
              <ProtectedRoute exact path='/changepassword' component={ChangePassWord}/>
              <AdminRoute exact path="/dashboard" component={Dashboard } />
              <AdminRoute exact path="/team" component={Team} />
              <AdminRoute exact path="/blog" component={Blog } />
              <AdminRoute exact path="/category" component={Category} />
              <AdminRoute exact path="/form" component={Form } />
              <AdminRoute exact path="/bar" component={Bar} />
              <AdminRoute exact path="/pie" component={Pie} />
              <AdminRoute exact path="/line" component={Line} />
              <Route path="/" component={PageNotFound} />

            </Switch>
          </Router>
        </ToastProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
