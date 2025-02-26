import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './index.css'
import LoginPage from './pages/Loginpage';
import SignupPage from './pages/SignupPage';
import App from './App';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes >
      <Route path='/' element={<App />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  </BrowserRouter>,
)
