import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Uploads from './Uploads'; 

export default function Feed() {
    const {logout} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);

    return (<div style={{display:'flex', justifyContent: 'center',alignItems: 'center', flexDirection: 'column'}}>
                <div className='comp' style={{width:'50%'}}>
                    <h1>Feeds</h1>
                    <button onClick={logout}>Log out</button>
                </div>
                <Uploads user={user}/>
            </div>);
}
