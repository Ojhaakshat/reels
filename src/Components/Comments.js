import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';


function Comments({postData}) {
    const [comments, setComments] = useState(null);
    useEffect( async()=> {
        let arr = []
        for(let i = 0; i < postData.comments.length; i++) {
            let data = await database.comments.doc(postData.comments[i]).get();
            arr.push(data.data());
        }
        setComments(arr)
    }, [postData])
  return (
      <>
      {
        comments == null ? <CircularProgress/>:
        <>
        {
            comments.map((comment, index) => (
                <React.Fragment key={index}>
                    <div style={{display:'flex'}}>
                        <Avatar src={comment.uProfileImage} />
                        <p><span style={{fontWeight: 'bold'}}>{comment.uName}</span> &nbsp;&nbsp; {comment.text}</p>
                    </div>
                </React.Fragment>
                
            ))
        }
        </>
      }
      </>
  )
}

export default Comments;
