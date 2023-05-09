import {useState, useEffect} from 'react';

function EditForm({userInfo}){
    const [user, setUser] = useState([])
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [picture, setPicture] = useState("");

    const getUser = async () => {
        const res = await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{
                        userByUsername(username: "${userInfo.username}"){
                            username
                            email
                            password
                            picture
                        }
                    }
                `
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.errors){
                alert(data.errors[0].message)
            }
            setUser(data.data.userByUsername)
            setUsername(data.data.userByUsername.username);
            setEmail(data.data.userByUsername.email);
            setPassword(data.data.userByUsername.password);
            setConfirm(data.data.userByUsername.password);
            setPicture(data.data.userByUsername.picture);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getUser()
    }, [])


    const editUser = async (e) => {
        e.preventDefault()
        const res = await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        editUser(username: "${user.username}", newUsername: "${username}",email: "${email}", oldPassword: "${user.password}", password: "${password}", passConf: "${confirm}", picture: "${picture}"){
                            username
                        }
                    }
                `
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.errors){
                alert(data.errors[0].message)
            }
            
        }).catch(err => {
            console.log(err);
        });
    }


    return(
        <div>
            <h1>Edit Profile /does not work yet/ </h1>
            <form>
                <label>New Username: </label>
                    <br/>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <br/>
                    <label>New Email: </label>
                    <br/>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <label>New Password: </label>
                    <br/>
                    {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> */}
                    <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <label>Confirm Password: </label>
                    <br/>
                    {/* <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}/> */}
                    <input type="password" placeholder='Confirm Password...' onChange={(e) => setConfirm(e.target.value)}/>
                    <br/>
                    <div>
                        Change Profile Picture here
                    </div>
                    <br/>
                    <button onClick={(e) => editUser(e)}>Submit</button>
            </form>
        </div>
    )
}

export default EditForm