import {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';


function LoggedInUserProfile({userInfo, id}){
    const [user, setUser] = useState([]);
    const cookies = new Cookies();

    function logout(){
        cookies.remove('jwt');
        window.location.reload(false);
    }

    useEffect(() => {
        setUser(userInfo);
    }, [])

    return(
        <div>
            <h1>Welcome {user.username}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
    
    
}

export default LoggedInUserProfile