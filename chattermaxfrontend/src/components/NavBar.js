import { NavLink, useNavigate } from 'react-router-dom';
import '../style/NavBarStyle.css';

const NavBar = ({user}) => {
    let navigate = useNavigate();

    function logout(){
        cookies.remove('jwt');
        window.location.reload(false);
    }

    if(user != null){
        return(
            <header>

            </header>
        )
    }


}