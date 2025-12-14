import {Routes, Route} from 'react-router-dom'

import './App.css';
import Login from './components/Login';
import ForgetPwd from "./components/ForgetPwd"
import Layout from './components/Layout';
import Attendence from './components/Attendence';
import Staff from './components/Staff';
import Department from './components/Department'
import Level from './components/Level';
import Assessment from './components/Assessment'
import Salary from './components/Salary';
import RewardRecord from './components/RewardRecord';
import AttendanceInfo from './components/AttendanceInfo'
import NotFound from './components/NotFound';



function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpwd" element={<ForgetPwd />}/>
      <Route path="/oa" element={<Layout />}>
        <Route path="attendence" element={<Attendence />}/>
        <Route path="staff" element={<Staff />}/>
        <Route path="department" element={<Department />}/>
        <Route path="level" element={<Level/>}/>
        <Route path="assessment" element={<Assessment />}/>
        <Route path="salary" element={<Salary />}/>
        <Route path="rewardrecord" element={<RewardRecord />}/>
        <Route path="attendanceinfo" element={<AttendanceInfo />}/>
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}

export default App;
