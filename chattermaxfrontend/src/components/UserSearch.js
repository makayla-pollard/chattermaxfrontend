import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function UserSearch(){
    let navigate = useNavigate(); 
    const [users, setUsers] = useState([]);
    const [ filteredUsers, setFilteredUsers ] = useState([]);
    const [ usernameFilter, setUsernameFilter ] = useState('');

    useEffect(() => {
        var tempUsers = users.filter((users) => {
            return users.username.toLowerCase().includes(usernameFilter)
        });

        setFilteredUsers(tempUsers);
    }, [usernameFilter])

    function linkToProfile(username){
        navigate(`/profile/${username}`)
    }


    async function getUsers(){
        await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        users{
                            _id
                            username
                            picture
                        }
                    }`
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            setUsers(data.data.users)
            setFilteredUsers(data.data.users)
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        getUsers();
    },[]);


    return(
        <div>
            <form>
                    <div>
                        <p>Search</p>
                        <label >Username:</label>
                        <input type='text' placeholder="Username" value={usernameFilter} onChange={(e) => setUsernameFilter(e.target.value)} />
                    </div>
                </form>
                <br/>
                <div>
                    {
                        filteredUsers?.map((user) => (
                            <div key={user._id} onClick={() => linkToProfile(user.username)}>
                                <img src={user.picture} alt= "profile image"/> 
                                <div>{user.username}</div>
                            </div>
                        ))
                    }
                </div>
            
        </div>
    )
}

export default UserSearch