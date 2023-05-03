import {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();
    const current = new Date();
    const nextDay = new Date();

    async function loginuser(event){
        event.preventDefault();
        const response = await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify ({
                query: `
                    query {
                        login(username: "${username}", password: "${password}") {
                            userId
                            token
                            tkExp
                        }
                    }
                `
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            if(data.errors){
                alert(data.errors[0].message)
            }else{
                nextDay.setDate(current.getDate() + 1)
                cookies.set('jwt', data.data.login.token, {
                    path: "/",
                    expires: nextDay
                })
                alert("Login Successful")
                window.location.reload(false);
            }
            
        }).catch(err => {
            console.log(err);
        });
    }

        
    return(
        <div>
            <h1>Login</h1>

        <div>
            <form onSubmit={(e) => loginuser(e)}>
                <label>Username: </label>
                <br/>
                <input value= {username} onChange={(e) => setUsername(e.target.value)} type="text"></input>
                <br/>
                <label >Password: </label>
                <br/>
                <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}></input>
                <br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
        <div>
            <p>Don't have an account? <Link to="/">register here.</Link></p>
        </div>
        </div> 
    )
}

export default Login;