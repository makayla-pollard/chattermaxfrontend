import { useParams } from "react-router-dom";

function PublicProfile(){
    const {id} = useParams();

    //getUserbyUsername with ID
    //Post public information
    
    return(
        <div>
            <h1>{id}</h1>
        </div>
    )
}

export default PublicProfile;