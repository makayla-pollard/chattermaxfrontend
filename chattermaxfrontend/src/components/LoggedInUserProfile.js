import {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import "../style/ProfileStyle.css";


function LoggedInUserProfile({userInfo, id}){
    const cookies = new Cookies();
    const [user, setUser] = useState([]);
    
    function logout(){
        cookies.remove('jwt');
        window.location.reload(false);
    }

    async function getUser(username){
        const response = await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify ({
                query: `
                    query {
                        userByUsername(username: "${username}") {
                            username
                            email
                            picture
                        }
                    }
                `
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            setUser(data.data.userByUsername)
            
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getUser(userInfo.username)
        
    }, [])
    
    return(
        <div className="profile">
            <h1>Welcome {user.username}</h1>
            <img src={user.picture} alt= "profile image"/> 
            <button onClick={logout}>Logout</button>
        </div>
    )
    
    
}

export default LoggedInUserProfile