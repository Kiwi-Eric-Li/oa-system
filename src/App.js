import {Routes, Route} from 'react-router-dom'

import './App.css';
import Login from './components/Login';
import ForgetPwd from "./components/ForgetPwd"


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpwd" element={<ForgetPwd />}/>
    </Routes>
  );
}

export default App;
