import { BrowserRouter, Routes, Route } from 'react-router';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import AuthLayout from './layouts/AuthLayout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginView />} />
          <Route path='register' element={<RegisterView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
