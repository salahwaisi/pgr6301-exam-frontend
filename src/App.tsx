import { Route, Routes } from 'react-router';
import AnonymousLayout from './components/AnonymousLayout';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import UserLoginView from './pages/User/login';
import ManagerIndexView from './pages/Manager';
import EmployeeIndexView from './pages/Employee';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticatedLayout />}>
      <Route index path='/manager' element={<ManagerIndexView />} />
      <Route index path='/employee' element={<EmployeeIndexView />} />
      </Route>

      <Route path="/user" element={<AnonymousLayout />}>
        <Route index path='/user/login' element={<UserLoginView />} />
      </Route>
    </Routes>
  );
}

export default App;
