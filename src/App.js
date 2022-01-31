import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup'
import {BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';
function App() {
  return (
    <BrowserRouter>
      <Login/>
      {/* <Signup/> */}
    </BrowserRouter>
  );
}

export default App;
