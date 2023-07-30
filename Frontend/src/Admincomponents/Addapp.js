import React, { useState } from 'react';
import axios from 'axios';
import { getAuthUser } from '../helper/Storage';

import '../AdminStyle/AddTrav.css';
import '../AdminStyle/Addapp.css';

import classes from '../AdminStyle/AddAppointment.module.css';

const Addapp = ({ OnAddAppointment }) => {
	const auth = getAuthUser();
	const [from_where, setFrom] = useState('');
	const [to_where, setTo] = useState('');
	const [ticket_price, setPrice] = useState('');
	const [day_and_time, setTime] = useState('');

	const submitHandler = async e => {
		e.preventDefault();
		try {
			await axios.post(
				'http://localhost:4000/appointments/create',
				{
					from_where,
					to_where,
					ticket_price,
					day_and_time,
				},
				{
					headers: {
						token: auth.token,
					},
				}
			);
			OnAddAppointment();
			reset();
			hideModal();
		} catch (error) {
			console.error(error);
		}
	};

	const hideModal = () => {
		const x = document.getElementById('add-appointment-modal');
		x.style.display = 'none';
	};

	const reset = () => {
		setFrom('');
		setTo('');
		setPrice('');
		setTime('');
	};

	return (
		<form
			id='add-appointment-modal'
			className={classes['add-modal']}
			onSubmit={submitHandler}>
			<h4>Add Appointments</h4>
			<div>
				<label>From</label>
				<input
					type='text'
					className='form-control'
					required
					value={from_where}
					onChange={e => setFrom(e.target.value)}
				/>
			</div>
			<div>
				<label>To</label>
				<input
					type='text'
					className='form-control'
					required
					value={to_where}
					onChange={e => setTo(e.target.value)}
				/>
			</div>
			<div>
				<label>Ticket price</label>
				<input
					type='text'
					className='form-control'
					required
					value={ticket_price}
					onChange={e => setPrice(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='datetime'>Date and time</label>
				<input
					type='datetime-local'
					id='datetime'
					name='datetime'
					className='form-control'
					required
					value={day_and_time}
					onChange={e => setTime(e.target.value)}
				/>
			</div>
			<div className={classes['btn-box']}>
				<button
					className={classes['btn-cancel']}
					type='button'
					data-dismiss='modal'
					onClick={hideModal}>
					Cancel
				</button>
				<button className={classes['btn-save']} type='submit'>
					Add
				</button>
			</div>
		</form>
	);
};

export default Addapp;
