import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Feed from './Components/Feed';
import Authorization from './Components/Authorization';
import Forgotpass from './Components/Forgotpass';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path = '/' element={<Feed/>}/> */}
          <Route element={<Authorization/>}>
            <Route path='/' element={<Feed/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>      
          <Route path='/forgotpass' element={<Forgotpass/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
