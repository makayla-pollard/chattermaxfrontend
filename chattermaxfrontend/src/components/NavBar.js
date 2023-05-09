import { NavLink, useNavigate } from 'react-router-dom';

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