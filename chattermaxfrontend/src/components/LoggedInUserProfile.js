import {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import "../style/ProfileStyle.css";
import { useNavigate } from "react-router-dom";
import CommentForm from './CommentForm';
import Comments from './Comments'
function LoggedInUserProfile({userInfo, id}){
    let navigate = useNavigate(); 
    const cookies = new Cookies();
    const [user, setUser] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    

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
                            followers
                            following
                        }
                    }
                `
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            setUser(data.data.userByUsername)
            setFollowers(data.data.userByUsername.followers)
            setFollowings(data.data.userByUsername.following)
        }).catch(err => {
            console.log(err);
        });
    }
    function linkToProfile(username){
        navigate(`/profile/${username}`)
        window.location.reload(false);

    }

    function linkToEdit(){
        navigate('/edit-profile')
    }

    useEffect(() => {
        getUser(userInfo.username)
        
    }, [])
    
    return(
        <div className="profile">
            <h1>Welcome {user.username}</h1>
            <img src={user.picture} alt= "profile image"/>
            <br/>
            <br/>
            <div>
                <button onClick={() => linkToEdit()}>Edit Profile</button> 
            </div>
            <br/>
            <div>
                <div className="block">
                    <div className="blockTitle">
                        FOLLOWERS
                    </div>
                    <div  className="list">
                        {
                            followers?.map((user) => (
                                <div className="userBlock">
                                    <div onClick={() => linkToProfile(user)}>
                                        <div>{user}</div>
                                    </div>
                                </div>
                                
                            ))
                        }
                    </div>
                </div>
                <div className="block">
                    <div className="blockTitle">
                        FOLLOWING
                    </div>
                    <div className="list">
                        {
                            followings?.map((user) => (
                                <div className="userBlock">
                                    <div onClick={() => linkToProfile(user)}>
                                        <div>{user}</div>
                                    </div>
                                </div>
                                
                            ))
                        }
                        
                    </div>
                </div>

            </div>
            <div>
                <CommentForm commentee={user.username} commenter={userInfo.username}/>
            </div>
            <br/>
            <div>
                <Comments username={userInfo.username}/>
            </div>
        </div>
    )
    
    
}

export default LoggedInUserProfile