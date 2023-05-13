import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("")

    
    async function createUser(e){
        e.preventDefault();
        
        const res = await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify ({
                query: `
                mutation {
                    createUser(userInput: {username: "${username}", email: "${email}",password: "${password}", passConf: "${confirm}"}) {
                        _id
                        username
                    }
                }
                `
            })
        }).then(res => {
            if(res.status !== 200&& res.status !==201 ){
                throw new Error('request failed');
            }
            return res.json();
        }).then(data => {
            if(data.errors){
                alert(data.errors[0].message)
            }
            if(data.data.createUser != null){
                fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/createUser', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: data.data.createUser.username,
                        secret: data.data.createUser._id
                    })
                }).then((res) => res.json())
                .then(data => {
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                });
                alert("User Created")
                navigate('/login');
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    return (
        <div>
            <h1 className="header">Register</h1>

        <div>
            <form onSubmit={(e) => createUser(e)}>
                <div align-items='left'>
                    <label>Username: </label>
                    <br/>
                    <input type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
                    <br/>
                    <label>Email: </label>
                    <br/>
                    <input type="text" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <label>Password: </label>
                    <br/>
                    <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <label>Confirm Password: </label>
                    <br/>
                    <input type="password" placeholder="Confirm Password..." onChange={(e) => setConfirm(e.target.value)}/>
                </div>
                <input type="submit" value="Register"/>
            </form>
        </div>

            <div>
                <p>Already have an account? <Link to="/login">login here.</Link></p>
            </div>
        </div>
    )
}

export default Register;