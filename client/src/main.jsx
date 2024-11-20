import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from '@/components/Register';
import Login from '@/components/Login';
import Navbar from '@/components/Navbar';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path='/' element={<App />}></Route>
				<Route path='/auth/login' element={<Login/>}></Route>
				<Route path='/auth/create-account' element={<Register/>}></Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
