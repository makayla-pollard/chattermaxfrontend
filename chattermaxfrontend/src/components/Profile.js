import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import React, {useState, useEffect, Suspense} from 'react';
import { useParams } from 'react-router-dom';
const LoggedInUserProfile = React.lazy(() => import ('./LoggedInUserProfile'));


function Profile(){
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


    return(
        <div>
            <Suspense fallback = {<div>Loading.....</div>}>
                <LoggedInUserProfile userInfo = {user} id = {id} />
            </Suspense>
            
        </div>
    )
}

export default Profile;