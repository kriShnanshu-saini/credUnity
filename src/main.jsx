import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from '@/components/Register';
import Login from '@/components/Login';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					{/* child routes */}
					<Route path='/auth/login' element={<Login/>}></Route>
					<Route path='/auth/create-account' element={<Register/>}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
