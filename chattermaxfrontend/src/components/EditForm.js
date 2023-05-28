import {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function EditForm({userInfo}){
    let navigate = useNavigate();
    const cookies = new Cookies();
    const [user, setUser] = useState([])
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    

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
        }).catch(err => {
            console.log(err);
        });

        
    }

    useEffect(() => {
        getUser()
    }, [])

    function logout(){
        cookies.remove('jwt');
        window.location.reload(false);
    }

    function goBack(username){
        navigate(`/my-profile/${username}`)
    }


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
                        editUser(username: "${user.username}", newUsername: "${username}",email: "${email}"){
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
        alert("profile changed! relogin!")
        logout();
    }

    function goToEditPhoto(){
        navigate("/edit-photo")
    }

    function goToEditPassword(){
        navigate("/edit-password")
    }


    return(
        <div>
            <h2 className="backButton" onClick={() => goBack(userInfo.username)}>← Go Back</h2>
            <h1>Edit Profile</h1>
            <form>
                <label>New Username: </label>
                    <br/>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <br/>
                    <label>New Email: </label>
                    <br/>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <button onClick={(e) => editUser(e)}>Submit</button>
            </form>
            <button onClick={() => goToEditPhoto()}>Edit Profile Photo</button>
            <button onClick={() => goToEditPassword()}>Edit Password</button>
        </div>
    )
}

export default EditForm