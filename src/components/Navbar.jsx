import { Logo } from "@/lib/constants";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='flex justify-between items-center px-4 py-8'>
            <div className="text-xl font-bold">
                <Link to="/">{Logo}</Link>
            </div>

            <div className="flex gap-6">
                {['Home', 'About Us', 'Services', 'Contact'].map(el => (
                    <Link key={el} to={`/${el.split(' ').join('-').toLowerCase()}`} className="text-base mx-4 no-underline">{el}</Link>
                ))}
            </div>

            <div className="">
                {['Login', 'Create Account'].map(el => (
                    <Link key={el} to={`/auth/${el.split(' ').join('-').toLowerCase()}`} className="text-base mx-4 no-underline">{el}</Link>
                ))}
            </div>
		</nav>
	);
};

export default Navbar;
