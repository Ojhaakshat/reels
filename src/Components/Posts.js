import React from 'react';
import { useState, useEffect } from 'react';   
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';

function Posts({userData}) {
    const [posts,setPosts] = useState(null);
    useEffect(()=>{
        let postarr = []
        const unsubscribe = database.posts.orderBy('createdAt','desc').onSnapshot((snap)=>{
            postarr = []
            snap.forEach(doc=>{
                let data = {...doc.data(),postId:doc.id}
                postarr.push(data)
            })
            setPosts(postarr)
        })
        return unsubscribe
    },[])
  return (
        <div>
            {
                 posts==null || userData==null ? <CircularProgress /> :
  
                    <div className="videoContainer">
                        {console.log(posts.length)}
                        {
                            posts.map((post,index)=>(
                                <React.Fragment key={index}>
                                    <div className='videos'>
                                        <Video src={post.pUrl}/>
                                        <div className="fa" style={{display:'flex'}}>
                                            <Avatar src={userData.url} />
                                            <h4>{userData.name}</h4>
                                        </div>
                                        <Like userData={userData} postData={post} />
                                    </div>
                                </React.Fragment>

                            ))
                        }  
                    </div>
          
            }
        </div>
  );
}

export default Posts;
