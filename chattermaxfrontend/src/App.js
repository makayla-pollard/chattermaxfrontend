import './App.css';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import Profile from './components/Profile';
import PublicProfile from './components/PublicProfile';
import EditProfile from './components/EditProfile';
import UserSearch from './components/UserSearch';
import Chat from './components/Chat';
import NavBar from './components/NavBar'
import EditPhoto from './components/EditPhoto';
import EditPassword from './components/EditPassword';
import Home from './components/Home';

function App() {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = cookies.get('jwt');
    if(token){
      let decoded = jwt(token)
      setUser(decoded);
    }
    
  }, [])

  
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar user={user}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/login" element={user ? <Navigate replace to={`/my-profile/${user.username}`}/> : <Login/>}/>
          <Route path="/my-profile/:id" element={user? <Profile/>: <Navigate replace to={"/login"}/> } />
          <Route path="/profile/:id" element={<PublicProfile/>}/>
          <Route path='/edit-profile' element={user ? <EditProfile/> : <Navigate replace to={"/login"}/>}/>
          <Route path='/users' element={<UserSearch/>} />
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/edit-photo" element={<EditPhoto user={user}/>}/>
          <Route path="/edit-password" element={<EditPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
