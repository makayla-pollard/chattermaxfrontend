import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import React, {useState, useEffect, Suspense} from 'react';

const EditForm = React.lazy(() => import ('./EditForm'));

function EditProfile(){
    
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
            <Suspense fallback={<div>Loading...</div>}>
                <EditForm userInfo={user}/>
            </Suspense>
        </div>
    )
}

export default EditProfile