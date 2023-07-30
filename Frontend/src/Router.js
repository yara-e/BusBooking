import { createBrowserRouter } from 'react-router-dom';
import ManagTrav from './Admincomponents/ManagTrav';
import Show from './Admincomponents/Show';
import Ma from './Admincomponents/Managapp';
import Requests from './Admincomponents/Requests';
import Tickets from './Usercomponents/Tickets';
import Profile from './Usercomponents/Profile';
import HistoryTickets from './Usercomponents/HistoryTickets';
import Login from './shared/login';
import Register from './shared/register';

import { isAuthenticated, isAdmin } from './helper/Storage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Tickets />,
	},
	{
		path: '/managetrav',
		element: isAuthenticated() && isAdmin() ? <ManagTrav /> : <Login />,
	},
	{
		path: '/show/:id',
		element: <Show />,
	},
	{
		path: '/manageappoint',
		element: isAuthenticated() && isAdmin() ? <Ma /> : <Login />,
	},
	{
		path: '/requests',
		element: isAuthenticated() && isAdmin() ? <Requests /> : <Login />,
	},
	{
		path: '/tickets',
		element: <Tickets />,
	},
	{
		path: '/profile',
		element: <Profile />,
	},
	{
		path: '/history',
		element: <HistoryTickets />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
]);
