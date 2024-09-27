
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import  ListMember from './pages/Member/ListMember';
import EditMember from './pages/Member/EditMember';
import  CreateMember  from './pages/Admin/Create/CreateAdmin';
import Home from './pages/User/Home';
import Package from './pages/User/Package';
import Payment from './pages/User/Payment';
import Dashboard from './pages/Admin/Dashboard';
import ClassCreate from './pages/Admin/Class/Create';
import Class from './pages/Admin/Class';
import ClassType from './pages/Admin/Class/ClassType';
import EditClass from './pages/Admin/Class/Edit';
import Trainer from './pages/Admin/Class/Trainer';
import ListAdmin from './pages/Admin/List/ListAdmin';
import CreateAdmin from './pages/Admin/Create/CreateAdmin';
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/listMember' element={<ListMember />} />
        <Route path='/editMember' element={<EditMember />} />
        <Route path='/createMember' element={<CreateMember />} />
        <Route path="/package" element={<Package />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class" element={<Class />} />
        <Route path="/class/create" element={<ClassCreate />} />
        <Route path="/class/edit/:classID" element={<EditClass />} />
        <Route path="/class/classType" element={<ClassType />} />
        <Route path="/class/trainer" element={<Trainer />} />
        <Route path="/ListAdmin" element={<ListAdmin />} />
        <Route path="/CreateAdmin" element={<CreateAdmin />} />
      </Routes>
  );
}

export default App;
