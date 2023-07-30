import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthUser } from '../helper/Storage';

import classes from '../AdminStyle/EditAppointment.module.css';
import '../App.css';
import '../AdminStyle/EditTrav.css';

const Editapp = ({ id, OnEditAppointment }) => {
	const auth = getAuthUser();
	const [formData, setFormData] = useState({});

	useEffect(() => {
		// Fetch the data using axios and update the state
		axios
			.get(`http://localhost:4000/appointments/getone/${id}`)
			.then(response => {
				setFormData(response.data);
			})
			.catch(error => console.log(error));
	}, [id]);//the first time + on condition

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			// Update the data using axios
			await axios.put(`http://localhost:4000/appointments/${id}`, formData, {
				headers: {
					token: auth.token,
				},
			});
			OnEditAppointment();
			// Hide the edit form
			hideEdit();
		} catch (err) {
			console.log(err);
		}
	}

	function hideEdit() {
		const x = document.getElementById('edit-modal');
		x.style.display = 'none';
	}

	return (
		<form
			id='edit-modal'
			className={classes['edit-modal']}
			onSubmit={handleSubmit}>
			<h4 className='modal-title'>Edit Appointments</h4>

			<div>
				<label>From</label>
				<input
					type='text'
					className='form-control'
					required
					value={formData.from_where || ''}
					onChange={e =>
						setFormData({ ...formData, from_where: e.target.value })
					}
				/>
			</div>
			<div>
				<label>To</label>
				<input
					type='text'
					className='form-control'
					required
					value={formData.to_where || ''}
					onChange={e => setFormData({ ...formData, to_where: e.target.value })}
				/>
			</div>
			<div>
				<label>Ticket price</label>
				<textarea
					className='form-control'
					required
					value={formData.ticket_price || ''}
					onChange={e =>
						setFormData({ ...formData, ticket_price: e.target.value })
					}></textarea>
			</div>
			<div>
				<label htmlFor='datetime'>Date and time</label>
				<input
					type='datetime-local'
					id='datetime'
					name='datetime'
					className='form-control'
					required
					value={formData.day_and_time || ''}
					onChange={e =>
						setFormData({ ...formData, day_and_time: e.target.value })
					}
				/>
			</div>

			<div className={classes['btn-box']}>
				<button
					className={classes['btn-cancel']}
					type='button'
					data-dismiss='modal'
					onClick={hideEdit}>
					Cancel
				</button>
				<button className={classes['btn-save']} type='submit'>
					Save
				</button>
			</div>
		</form>
	);
};

export default Editapp;
