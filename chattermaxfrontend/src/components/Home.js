import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import Chattermaxgif from '../assets/bluey-chattermax.gif'
import '../style/HomeStyle.css'

export default function Home() {
    return (
        <div className='homeContainer'>
            <h1>Welcome to Chattermax</h1>
            <img src={Chattermaxgif} className='chattermax'></img>
            <br/>
            <h3>start chatting now </h3>
        <br/>
            <div className='text'><Link to="/login">login</Link>/<Link to="/register">register</Link></div>
            
        </div>
    )
}
