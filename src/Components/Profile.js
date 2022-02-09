import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import './Profile.css'

function Profile() {
    const {id} = useParams();
    const [userData, setUserdata] = useState(null);
    const [posts, setPosts] = useState(null);
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
                postarr.push(postData);
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
                    
                    </div> 
                </div>
            </>
      }
  </div>);
}

export default Profile;
