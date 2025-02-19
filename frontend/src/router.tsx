import { BrowserRouter, Routes, Route } from 'react-router';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';
import LinkTreeView from './views/LinkTreeView';
import ProfileView from './views/ProfileView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginView />} />
          <Route path='register' element={<RegisterView />} />
        </Route>
        <Route path='admin' element={<AppLayout />}>
          <Route index element={<LinkTreeView />} />
          <Route path='profile' element={<ProfileView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
