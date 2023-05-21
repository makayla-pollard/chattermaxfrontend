import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import "../style/PublicProfile.css"


function PublicProfile(){
    const {id} = useParams();
    const [user, setUser] = useState([]);
    
    async function getUser(){
        const response = await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify ({
                query: `
                    query {
                        userByUsername(username: "${id}") {
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
        getUser()
    },[])

    
    return(
        <div className="public">
            <img src={user.picture} alt= "profile image"/> 
            <h1>{user.username}</h1>
        </div>
    )
}

export default PublicProfile;