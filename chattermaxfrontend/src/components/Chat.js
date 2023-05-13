import {ChatEngine} from 'react-chat-engine';
import {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import './Chat.css'

const Chat = () => {
    const [username, setUsername] = useState("");
    const [secret, setSecret] = useState("");
    const cookies = new Cookies();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = cookies.get('jwt');
        if(token){
            let decoded = jwt(token)
            setUsername(decoded.username)
            setSecret(decoded.userId)
        }
        },[])
        
        if(username != "" && secret !=""){
            return(
                <ChatEngine
                    height="100vh"
                    projectID="d39321c3-ea7c-4c17-832d-693f16cadee6"
                    userName={username}
                    userSecret= {secret}
                />
            )
        }else{
            return(<></>)
        }
    
}

export default Chat;