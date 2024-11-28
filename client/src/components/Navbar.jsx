import { Logo } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		if (currentScrollY > lastScrollY) {
			// User is scrolling down
			setIsVisible(false);
		} else {
			// User is scrolling up
			setIsVisible(true);
		}
		setLastScrollY(currentScrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	return (
		// <nav className='flex justify-between items-center px-4 py-8 '>
		<nav className={`fixed z-50 top-0 left-0 w-full pt-2 bg-white transition-transform duration-300 dark:bg-black dark:text-white ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
			<div className='container mx-auto flex justify-between items-center p-4'>
				<div className='text-xl font-bold p-2'>
					<Link to='/'>{Logo}</Link>
				</div>
				<div className='flex gap-6'>
					{['Home', 'About Us', 'Services', 'Contact'].map(el => (
						<Link key={el} to={`/${el.split(' ').join('-').toLowerCase()}`} className='group/item relative text-base px-3 py-2 rounded-md transition-transform duration-200 transform hover:-translate-y-[3px] text-gray-800 dark:text-gray-200'>
							{el}
							{/* Add a visual effect on hover */}
							<div className='absolute left-0 right-0 h-[1px] w-full rounded-full bg-gray-100 opacity-0 transition-all duration-200 -bottom-1 group-hover/item:opacity-100'></div>
						</Link>
					))}
				</div>
				<div className='flex gap-4'>
					{['Login', 'Create Account'].map(el => (
						<Link
							key={el}
							to={`/auth/${el.split(' ').join('-').toLowerCase()}`}
							className='text-base mx-2 no-underline px-3 py-2 rounded-md hover:bg-zinc-50'>
							{' '}
							{el}{' '}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
