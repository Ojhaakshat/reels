import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Feed() {
    const {logout} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);

    return (<div><h1>Feeds</h1><button onClick={logout}>Log out</button></div>);
}
