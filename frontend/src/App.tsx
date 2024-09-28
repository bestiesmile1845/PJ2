import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ListMember from './pages/Member/ListMember';
import EditMember from './pages/Member/EditMember';
import CreateMember  from './pages/Member/create/CreateMember';
import Home from './pages/User/Home';
import Package from './pages/User/Package';
import Payment from './pages/User/Payment';
import ListAdmin from './pages/Admin/List/ListAdmin';
import CreateAdmin from './pages/Admin/create/CreateAdmin';
import EditAdmin from './pages/Admin/Edit/EditAdmin';


import Dashboard from "./pages/Admin/Dashboard";
import Class from "./pages/Admin/Class";
import ClassCreate from "./pages/Admin/Class/Create";
import EditClass from "./pages/Admin/Class/Edit";
import ClassType from "./pages/Admin/Class/ClassType";
import Trainer from "./pages/Admin/Class/Trainer";
import PackageAd from "./pages/Admin/Packages";
import Createpackage from "./pages/Admin/Packages/Create";
import EditPackage from "./pages/Admin/Packages/Edit";
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
        <Route path="/ListAdmin" element={<ListAdmin />} />
        <Route path="/CreateAdmin" element={<CreateAdmin />} />
        <Route path="/EditAdmin" element={<EditAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class" element={<Class />} />
        <Route path="/class/create" element={<ClassCreate />} />
        <Route path="/class/edit/:classID" element={<EditClass />} />
        <Route path="/class/classType" element={<ClassType />} />
        <Route path="/class/trainer" element={<Trainer />} />
        <Route path="/admin/package" element={<PackageAd />} />
        <Route path="admin/package/create" element={<Createpackage />} />
        <Route path="/admin/package/edit/:id" element={<EditPackage />} />

      </Routes>
  );
}

export default App;