import {useState} from 'react'

function CommentForm({commentee, commenter}){
    const [comment, setComment] = useState("")

    const addComment = async (e) => {
        e.preventDefault()
        const res = await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        createComment(commentInput: {commentee: "${commentee}", commenter: "${commenter}", comment: "${comment}"}){
                            comment
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
        window.location.reload(false)
    }

    return(
        <div>
            <div>SEND COMMENT:</div>
            <form>
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                    
                    <button onClick={(e) => addComment(e)}>Send</button>
            </form>
        </div>
    )
}

export default CommentForm