import { Link, Outlet } from 'react-router-dom';

function App() {
	return (
		<main className='w-full h-full px-4'>
			<div className='flex items-center justify-between'>
				<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>CREDUNITY</h2>
				<div className='mt-2 flex gap-2'>
					<Link to='/auth/login'>Login</Link>
					<Link to='/auth/create-account'>Create an account</Link>
				</div>
			</div>
			<Outlet />
		</main>
	);
}

export default App;
