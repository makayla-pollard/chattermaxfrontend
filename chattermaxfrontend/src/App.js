import './App.css';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import Profile from './components/Profile';
import PublicProfile from './components/PublicProfile';

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
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path="/login" element={user ? <Navigate replace to={`/my-profile/${user.username}`}/> : <Login/>}/>
          <Route path="/my-profile/:id" element={user? <Profile/>: <Navigate replace to={"/login"}/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
