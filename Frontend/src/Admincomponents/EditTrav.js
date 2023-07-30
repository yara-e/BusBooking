import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { getAuthUser } from '../helper/Storage';

import classes from '../AdminStyle/EditTrav.module.css';
import '../App.css';

const EditTrav = ({ id, onEditTrav }) => {
	const auth = getAuthUser();
	const [formData, setFormData] = useState({});

	useEffect(() => {
		// Fetch the data using axios and update the state
		axios
			.get(`http://localhost:4000/traveler/getone/${id}`)
			.then(response => {
				console.log(response);
				setFormData(response.data);
			})
			.catch(error => console.log(error));
	}, [id]);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			// Update the data using axios
			await axios.put(`http://localhost:4000/traveler/${id}`, formData, {
				headers: {
					token: auth.token,
				},
			});
			onEditTrav();
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
			onSubmit={handleSubmit}
			className={classes['edit-modal']}>
			<h4>Edit Traveler</h4>
			<div>
				<label>Name</label>
				<input
					type='text'
					className='form-control'
					required
					value={formData.name || ''}
					onChange={e => setFormData({ ...formData, name: e.target.value })}
				/>
			</div>
			<div>
				<label>Email</label>
				<input
					type='text'
					className='form-control'
					required
					value={formData.email || ''}
					onChange={e => setFormData({ ...formData, email: e.target.value })}
				/>
			</div>
			<div>
				<label>Phone</label>
				<input
					type='text'
					className='form-control'
					required
					value={formData.phone || ''}
					onChange={e => setFormData({ ...formData, phone: e.target.value })}
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

export default EditTrav;
