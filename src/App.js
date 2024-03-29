
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login';
import Registration from './components/Pages/Register/Registration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPost from './components/Pages/AddPost/AddPost';
import PostDescription from './components/PostDescription/PostDescription';
import SharePost from './components/Pages/SharePost/SharePost';
import Shares from './components/Pages/Shares/Shares';
import Profile from './components/Pages/Profile/Profile';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact  path='/' element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
          <Route exact path='/home' element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
          <Route exact path='/addPost' element={<ProtectedRoute><AddPost /></ProtectedRoute>}></Route>
          <Route exact path='/shares' element={<ProtectedRoute><Shares /></ProtectedRoute>}></Route>
          <Route exact path='/profile/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
          <Route exact path='/sharePost/:id' element={<ProtectedRoute><SharePost /></ProtectedRoute>}></Route>
          <Route exact path='/post/:id' element={<ProtectedRoute><PostDescription /></ProtectedRoute>}></Route>
          <Route exact path='/login' element={<Login></Login>}></Route>
          <Route exact path='/register' element={<Registration></Registration>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


function ProtectedRoute({ children }) {
  if (localStorage.getItem('my-social')) {
    return children;
  }
  else {
    return <Navigate to='/login'></Navigate>
  }
}

export default App;
