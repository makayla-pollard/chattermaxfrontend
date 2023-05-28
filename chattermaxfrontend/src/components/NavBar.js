import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import '../style/NavBar.css'
import icon from '../assets/bubbleheart.png';

const NavBar = ({user}) => {
    let navigate = useNavigate();
    const cookies = new Cookies();

    function logout(){
        cookies.remove('jwt');
        window.location.reload(false);
    }

    if(user == null){
        return(
            <header className="headerNav">
                <div className="main">
                    <div className='title'>
                        <img src={icon}></img>
                        Chattermax
                    </div>
                    <nav className='links'>
                            <ul>
                                <li>
                                    <NavLink to="/">Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
            </header>
        )
    }else{
        return(
            <header className='headerNav'>
                <div className="main">
                    <div className='title'>
                        <img src={icon}></img>
                        Chattermax
                    </div>
                    <nav className="links">
                        <ul>
                            <li>
                                <NavLink to="/users">User Search</NavLink>
                            </li>
                            <li>
                                <NavLink to="/chat">Chats</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/my-profile/${user.username}`}>Profile</NavLink>
                            </li>
                            <li>
                                <div className="logout" onClick={() => logout()}>Logout</div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }


}


export default NavBar