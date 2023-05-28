import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import {useState, useEffect} from 'react'

function EditPassword(){
    let navigate = useNavigate(); 
    function goBack(){
        navigate("/edit-profile")
    }

    const cookies = new Cookies();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const [passConf, setPassConf] = useState("");


    useEffect(() => {
        const token = cookies.get('jwt');
        if(token){
            let decoded = jwt(token);
            setUser(decoded);
            
        }
        
    }, [])
    
    const editPassword = async (e) => {
        e.preventDefault()
        const res = await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        editUserPassword(username: "${user.username}", password:"${password}", passConf: "${passConf}"){
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
            }else{
                alert("Password Changed")
            }
            
        }).catch(err => {
            console.log(err);
        });
        navigate("/edit-profile")
    }

    

    return(
        <div>
            <h2 className="backButton" onClick={() => goBack()}>← Go Back</h2>
            <h1>Edit Password</h1>
            
            <form>
                <label>New Password: </label>
                    <br/>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <label>Confirm Password: </label>
                    <br/>
                    <input type="text" value={passConf} onChange={(e) => setPassConf(e.target.value)}/>
                    <br/>
                    <button onClick={(e) => editPassword(e)}>Submit</button>
            </form>
            
        </div>
    )
}

export default EditPassword