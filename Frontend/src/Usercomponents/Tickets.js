import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Header from './Header';

import Footer from './Footer';
import Ticket from './Ticket';

import classes from '../UserStyle/Ticket.module.css';

const Tickets = () => {
	const [search, setSearch] = useState('');
	const [ticket, setticket] = useState({
		loading: true,
		results: [],
		err: null,
		reload: 0,
	});

	useEffect(() => {
		setticket({ ...ticket, loading: true });
		Axios.get('http://localhost:4000/appointments/show', {
			params: {
				search: search,
			},
		})
			.then(resp => {
				setticket({ ...ticket, results: resp.data, loading: false, err: null });
			})
			.catch(err => {
				setticket({
					...ticket,
					loading: false,
					err: ' something went wrong, please try again later ! ',
				});
			});
	}, [ticket.reload]);

	const searchMovies = e => {
		e.preventDefault();
		setticket({ ...ticket, reload: ticket.reload + 1 });
		console.log(search);
	};

	return (
		<>
			<Header />
			<form className={classes.searchForm} onSubmit={searchMovies}>
				<input
					type='text'
					className={classes.searchTerm}
					placeholder='Where are you going?'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<button type='submit' className={classes.searchButton}>
					<i className='fa fa-search'></i>
				</button>
			</form>
			<ul>
				{ticket.results.map(t => (
					<Ticket
						key={t.id}
						from_where={t.from_where}
						to_where={t.to_where}
						ticket_price={t.ticket_price}
						day_and_time={t.day_and_time}
						id={t.id}
					/>
				))}
			</ul>
			<Footer />
		</>
	);
};

export default Tickets;
