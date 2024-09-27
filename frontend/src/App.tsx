
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import  ListMember from './pages/Member/ListMember';
import EditMember from './pages/Member/EditMember';
import CreateMember  from './pages/Member/create/CreateMember';
import Home from './pages/User/Home';
import Package from './pages/User/Package';
import Payment from './pages/User/Payment';
import ListAdmin from './pages/Admin/List/ListAdmin';
import CreateAdmin from './pages/Admin/create/CreateAdmin';
import EditAdmin from './pages/Admin/Edit/EditAdmin';
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
      </Routes>
  );
}

export default App;
