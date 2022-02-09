import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';
import Uploads from './Uploads'; 
import Posts from './Posts';
import Navbar from './Navbar';

export default function Feed() {

    const [userData, setUserData] = useState(''); 
    const {logout} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);

    useEffect(()=> {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data())

        })
        return () => {unsub()}
    }, [user])

    return (<>
                <Navbar userData={userData} />
                <div style={{display:'flex', justifyContent: 'center',alignItems: 'center', flexDirection: 'column'}}>
                    {/* <div className='comp' style={{width:'50%'}}>
                        <h1>Feeds</h1>
                        <button onClick={logout}>Log out</button>
                    </div> */}
                    <Uploads user={userData}/>
                    <Posts userData={userData}/>
                </div>);

            </>)
}
