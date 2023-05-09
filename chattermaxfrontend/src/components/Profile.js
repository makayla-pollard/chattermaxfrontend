import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import React, {useState, useEffect, Suspense} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/ProfileStyle.css'
const LoggedInUserProfile = React.lazy(() => import ('./LoggedInUserProfile'));


function Profile(){
    let navigate = useNavigate();
    const {id} = useParams();
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = cookies.get('jwt');
        if(token){
            let decoded = jwt(token);
            setUser(decoded);
        }
        
    }, [])

    function goToEdit(){
        navigate("/edit-profile")
    }

    return(
        <div>
            <Suspense fallback = {<div>Loading.....</div>}>
                <LoggedInUserProfile userInfo = {user} id = {id} />
            </Suspense>
        </div>
    )
}

export default Profile;