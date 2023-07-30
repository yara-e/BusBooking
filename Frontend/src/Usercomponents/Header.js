import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeAuthUser, getAuthUser, isAdmin } from '../helper/Storage';

import '../UserStyle/Header.css';

const Header = () => {
	const navigate = useNavigate();
	const auth = getAuthUser();
	// const isAdmin = isAdmin();

	const Logout = () => {
		removeAuthUser();
		navigate('/');
	};

	return (
		<header className='header'>
			<h1 className='logo'>Bus Ticket</h1>
			<nav className='navigation-menu'>
				{auth && isAdmin() && <Link to='/managetrav'>Manage Travelers</Link>}
				{auth && isAdmin() && (
					<Link to='/manageappoint'>Manage Appointments</Link>
				)}
				<Link to='/tickets'>Tickets</Link>
				{auth && <Link to='/profile'>Profile</Link>}

				{auth && (
					<Link to='/login' onClick={Logout}>
						Logout
					</Link>
				)}
				{!auth && <Link to='/register'>Signup</Link>}
				{!auth && <Link to='/login'>Login</Link>}
			</nav>
		</header>
	);
};

export default Header;
