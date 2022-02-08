import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {database} from '../firebase';

function LikeModal({userData, postData}) {
    const [like,setLike] = useState(null);
    
    useEffect(()=>{
        let check = postData.likes.includes(userData.userId) ? true: false; 
        setLike(check);
    },[postData])

    const handleLike = () => {
        if(like == true) {
            let newarr = postData.likes.filter((ele)=>(ele != userData.userId))
            database.posts.doc(postData.postId).update({
                likes: newarr
            })
        } else {
            let newarr = [...postData.likes,userData.userId]
            database.posts.doc(postData.postId).update({
                likes:newarr
            })
        }
    }
  return <div>
            {
                like != null ?
                <>
                    {
                        like==true?<FavoriteIcon style={{padding: '1rem', paddingBottom: '0.75remrem', paddingTop: '0.5rem'}} className={`like`} onClick={handleLike}/> :<FavoriteIcon style={{padding: '1rem', paddingBottom: '0.75rem', paddingTop: '0.5rem'}}  className={`unlike2`} onClick={handleLike}/>                    
                    }
                </>:
                <></>
            }
      
  </div>;
}

export default LikeModal;
