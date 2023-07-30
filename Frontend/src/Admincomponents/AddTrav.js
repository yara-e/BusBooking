import React, { useState } from 'react';
import axios from 'axios';
import { getAuthUser } from '../helper/Storage';

import classes from '../AdminStyle/AddTrav.module.css';

const Add = ({ onAddTrav }) => {
	const auth = getAuthUser();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

	const nameChangeHandler = e => {
		setName(e.target.value);
	};

	const emailChangeHandler = e => {
		setEmail(e.target.value);
	};

	const passwordChangeHandler = e => {
		setPassword(e.target.value);
	};

	const phoneChangeHandler = e => {
		setPhone(e.target.value);
	};

	const submitHandler = async event => {
		event.preventDefault();

		try {
			await axios.post(
				'http://localhost:4000/traveler/create',
				{
					name,
					email,
					phone,
					password,
				},
				{
					headers: {
						token: auth.token,
					},
				}
			);
			onAddTrav();

			// Clear the form input
			setName('');
			setEmail('');
			setPhone('');
			setPassword('');

			hideModal();
		} catch (err) {
			console.log(err);
		}
	};

	function hideModal() {
		const x = document.getElementById('add-modal');
		x.style.display = 'none';
	}

	return (
		<form
			id='add-modal'
			className={classes['add-modal']}
			onSubmit={submitHandler}>
			<h4>Add Traveler</h4>
			<div>
				<label htmlFor='name'>Name</label>
				<input
					id='name'
					type='text'
					className='form-control'
					value={name}
					onChange={nameChangeHandler}
				/>
			</div>
			<div>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					type='email'
					className='form-control'
					value={email}
					onChange={emailChangeHandler}
				/>
			</div>
			<div>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					type='password'
					className='form-control'
					value={password}
					onChange={passwordChangeHandler}
				/>
			</div>
			<div>
				<label htmlFor='phone'>Phone</label>
				<input
					id='phone'
					type='text'
					className='form-control'
					value={phone}
					onChange={phoneChangeHandler}
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

export default Add;
