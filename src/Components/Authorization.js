import React from 'react';
import { useContext } from 'react';
import {Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Authorization(component) {
    const {user} = useContext(AuthContext) 
    // const navigate= useNavigate();
//   return (
//       <>
//         <Route {...rest} render={props=>{
//             return user?<Component {...props}/> : navigate('/login')
//         }} />
//       </>
//   );
    // return (
    //     user? component: navigate('/login')
    // )
    const location = useLocation();
    if(!user) {
        // return <Navigate to="/login" state={{ from: location }} />;
        return <Navigate to='/login' state={{from: location}} />;
    }
    return <Outlet/>
}

export default Authorization;
