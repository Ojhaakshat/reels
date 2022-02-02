import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>      
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
