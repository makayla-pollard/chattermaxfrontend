import {useState, useEffect} from 'react'

function Comments({username}){
    const [comments, setComments] = useState([]);

    async function getComments(){
        await fetch('http://ec2-18-116-21-237.us-east-2.compute.amazonaws.com:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify ({
                query: `
                    query {
                        commentsByCommentee(commentee: "${username}") {
                            comment
                            commentee
                            commenter
                        }
                    }
                `
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            setComments(data.data.commentsByCommentee)
            console.log(data.data.commentsByCommentee)
        }).catch(err => {
            console.log(err);
        });
    }


    useEffect(() => {
        getComments()
        
    }, [])

    return(
        <div>
            {
                comments?.map((comment) => (
                    <div>
                        {comment.commenter} : {comment.comment}
                    </div>
                ))
            }
        </div>
    )

}

export default Comments