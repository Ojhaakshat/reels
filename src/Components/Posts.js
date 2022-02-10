import React from 'react';
import { useState, useEffect } from 'react';   
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import LikeModal from './LikeModal'
import AddComment from './AddComment';
import Comments from './Comments';

function Posts({userData}) {
    const [posts,setPosts] = useState(null);
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

   
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

    const callback = entries => {
        entries.forEach(entry => {
            let ele = entry.target.childNodes[0];
            console.log(ele);
            ele.play().then(()=> {
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }

    let observer = new IntersectionObserver(callback, {threshold: 0.6});
    useEffect(()=> {
        const elements = document.querySelectorAll('.videos');
        elements.forEach(element => {
            observer.observe(element);
        })

        return ()=> {
            observer.disconnect();
        }
    }, [posts])

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
                                        <ChatBubbleIcon className='chatStyling' onClick={()=>handleClickOpen(post.pId)}/> 
                                        <Dialog
                                        open={open==post.pId}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth ={true}
                                        maxWidth = 'md'
                                    >
                                        <div className="modalContainer">
                                            <div className="video-modal">
                                                <video autoPlay={true} muted="muted" controls>
                                                    <source src={post.pUrl}/>
                                                </video>
                                            </div>
                                            <div className="comment-modal">
                                                <Card className="card1" style={{padding:'1rem'}}>
                                                    <Comments postData={post}/>
                                                </Card>
                                                <Card variant="outlined" className="card2">
                                                    <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                                    <div style={{display:'flex'}}>
                                                        <LikeModal postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                        <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} userData={userData} postData={post}/>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                    </Dialog>
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
