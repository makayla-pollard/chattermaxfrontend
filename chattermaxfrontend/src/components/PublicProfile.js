import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import "../style/PublicProfile.css"
import { useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
function PublicProfile(){
    let navigate = useNavigate(); 

    const {id} = useParams();
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState("");
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const cookies = new Cookies();
    useEffect(() => {
        const token = cookies.get('jwt');
        if(token){
            let decoded = jwt(token)
            setUsername(decoded.username)
        }
        },[])
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

    async function unfollowUser(e){
        e.preventDefault()
        await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify ({
                query: `
                    mutation{
                        deleteFollower(username: "${username}" , listHolder: "${user.username}" )
                    }
                `
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        mutation {
                            deleteFollowing(username: "${user.username}" , listHolder: "${username}" )
                        }`
                        
                    })
                }).then(res => {
                    res.json();
                }).then(data => {
                    console.log(data)
                }).catch(err => {
                    console.log(err);
                })
        }).catch(err => {
            console.log(err);
        });

        window.location.reload(false);
    }

    async function followUser(e){
        e.preventDefault();
        const response = await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify ({
                query: `
                mutation {
                    addFollower(username: "${username}" , listHolder: "${user.username}" )
                }`
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            
                fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        mutation {
                            addFollowing(username: "${user.username}" , listHolder: "${username}" )
                        }`
                        
                    })
                }).then(res => {
                    res.json();
                }).then(data => {
                    console.log(data)
                }).catch(err => {
                    console.log(err);
                })

        }).catch(err => {
            console.log(err)
        })
        window.location.reload(false);
    }

    useEffect(() => {
        getUser()
    },[])

    function linkToProfile(username){
        navigate(`/profile/${username}`)
        window.location.reload(false);

    }

    

    function showButton(){
        if (followers.includes(username) == true){
            return <button onClick={(e) => unfollowUser(e)}>Unfollow</button>
        }else if(username == user.username){
            return <></>
        }else{
            return <button onClick={(e) => followUser(e)}>Follow</button>
        }
    }
    
    return(
        <div className="public">
            <img src={user.picture} alt= "profile image"/> 
            <h1>{user.username}</h1>

            {showButton()}
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
                <CommentForm commentee={id} commenter={username}/>
            </div>
            <br/>
            <div>
                <Comments username={id}/>
            </div>
        </div>
    )
}

export default PublicProfile;