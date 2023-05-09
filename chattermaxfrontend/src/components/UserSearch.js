import {useState, useEffect} from 'react';

function UserSearch(){
    const [users, setUsers] = useState([]);

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
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        getUsers();
    },[]);


    return(
        <div>
            {
                users?.map((user) => (
                    <div key={user._id}>
                        <img src={user.picture} alt= "profile image"/> 
                        <div>{user.username}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default UserSearch