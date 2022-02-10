import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import './Profile.css'
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import LikeModal from './LikeModal'
import AddComment from './AddComment';
import Comments from './Comments';

function Profile() {
    const {id} = useParams();
    const [userData, setUserdata] = useState(null);
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect(()=> {
        database.users.doc(id).onSnapshot((snap)=> {
            setUserdata(snap.data())
        })
    }, [id])
    useEffect(async()=> {
        if(userData) {
            let postarr = [];
            for(let i = 0; i < userData.postIds.length; i++) {
                let postData = await database.posts.doc(userData.postIds[i]).get();
                postarr.push({...postData.data(), postId: postData.id});
            }
            setPosts(postarr);
        }
    }, [userData])
  return (<div>
      {
           posts==null || userData==null ? <CircularProgress /> :
            <>
                <Navbar userData={userData}/>
                <div className='navSpace'/>
                <div className='container'>
                    <div className='upperPart'>
                        <div className="profileImg">
                            <img src={userData.url}/>
                        </div>
                        <div className="info">
                            <Typography variant="h5">
                                Email : {userData.email}
                            </Typography>
                            <Typography variant="h6">
                                Posts : {userData.postIds.length}
                            </Typography>
                        </div>
                    </div>
                    <hr style={{marginTop: '2rem', marginBottom: '2em'}} />
                    <div className="profileVideos">
                        {console.log(posts.length)}
                        {
                            posts.map((post,index)=>(
                                <React.Fragment key={index}>
                                    <div className='videos'>
                                        <video muted="muted" onClick={()=>handleClickOpen(post.pId)}>
                                            <source src={post.pUrl}/>
                                        </video>
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
                </div>
            </>
      }
  </div>);
}

export default Profile;
