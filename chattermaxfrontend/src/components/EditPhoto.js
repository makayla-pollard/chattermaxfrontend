import { useNavigate } from 'react-router-dom';
import "../style/EditPhoto.css";
import {useState} from 'react';

function EditPhoto({user}){
    let navigate = useNavigate();
    const [picture, setPicture] = useState("")

    function goBack(){
        navigate("/edit-profile")
    }

    async function editPhoto(e){
        e.preventDefault();
        await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        editUserPhoto(username: "${user.username}", picture: "${picture}"){
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
                alert("Changed Successfully")
            }
            
        }).catch(err => {
            console.log(err);
        });
    }


    return(<div>
        <h2 className="backButton" onClick={() => goBack()}>← Go Back</h2>
        <h1>Edit Photo</h1>
        <button onClick={(e) => editPhoto(e)}>Edit Photo</button>
        {
            picture == "" ?
            <div>Select a Photo </div>
            :
            <div>Selected Photo: </div>
        }
        
        <img src={picture}/>
        <br/>
        <div>
            <div>
                <img src="http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/images/default.png" onClick={(e) => setPicture(e.target.src)}/>
                <img src="http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/images/bingo.jpg" onClick={(e) => setPicture(e.target.src)}/>
                <img src="http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/images/bingoangy.jpg" onClick={(e) => setPicture(e.target.src)}/>
                <img src="http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/images/bluey.jpg" onClick={(e) => setPicture(e.target.src)}/>
                <img src="http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/images/chattermax.jpg" onClick={(e) => setPicture(e.target.src)}/>
                <img src="http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/images/muffin.jpg" onClick={(e) => setPicture(e.target.src)}/>
                <img src="http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/images/unicorse.jpg" onClick={(e) => setPicture(e.target.src)}/>


            </div>

        </div>

    </div>)
}

export default EditPhoto;