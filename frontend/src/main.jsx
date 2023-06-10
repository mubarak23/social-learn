import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import App from './App.jsx';
import Post from './components/Posts/Post.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './index.css';
import EditProfileScreen from './screens/EditProfile.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import PostsScreen from './screens/PostsScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import UserScreen from './screens/UserScreen.jsx';
import UsersScreen from './screens/UsersScreen.jsx';
import store from './store.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/users' element={<UsersScreen />} />
      
      <Route path='/users/:userId' element={<UserScreen />} />
      <Route path='' element={<PrivateRoute />}>
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/edituser' element={<EditProfileScreen />} />
      <Route path='/posts' element={<PostsScreen/>} />
      <Route path='/posts/:postId' element={<Post />} />
      </Route>
    </ Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <RouterProvider router={router} />
  </Provider>
)
