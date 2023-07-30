import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SideBar from './SideBar';
import Add from './AddTrav';
import Edit from './EditTrav';
import axios from 'axios';
import { getAuthUser } from '../helper/Storage';

import classes from '../AdminStyle/ManageTrav.module.css';
import '../App.css';

const ManagTrav = () => {
	const [travelers, setTravelers] = useState([]);
	const [editId, setEditId] = useState(null);

	const auth = getAuthUser();

	function displayAdd() {
		const x = document.getElementById('add-modal');
		x.style.display = 'flex';
	}

	function displayEdit(id) {
		setEditId(id);
		const x = document.getElementById('edit-modal');
		x.style.display = 'flex';
	}

	const handleDelete = async id => {
		try {
			await axios.delete(`http://localhost:4000/traveler/${id}`, {
				headers: {
					token: auth.token,
				},
			});
			setTravelers(travelers.filter(traveler => traveler.id !== id));
		} catch (err) {
			console.log(err);
		}
	};

	const fetchAllUsers = async () => {
		const users = await axios.get('http://localhost:4000/traveler/all');
		setTravelers(users.data);
	};

	useEffect(() => {
		fetchAllUsers();
	}, []);

	return (
		<div className={classes.wrapper}>
			<SideBar />
			<main className={classes.main}>
				<h2>Manage Travelers</h2>
				{travelers.length > 0 && (
					<table className='table table-striped table-hover'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>History of requests</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{travelers.map(traveler => (
								<tr key={traveler.id}>
									<td>{traveler.name}</td>
									<td>{traveler.email}</td>
									<td>{traveler.phone}</td>
									<td>
										<Link to={`/show/${traveler.id}`}>
											<button className='btn btn-success'>Show</button>
										</Link>
									</td>

									<td>
										<div className={classes['btn-box']}>
											<button className='edit' data-toggle='modal'>
												<i
													className='material-icons'
													data-toggle='tooltip'
													title='Edit'
													onClick={() => displayEdit(traveler.id)}>
													&#xE254;
												</i>
											</button>
											<button className='delete' data-toggle='modal'>
												<i
													className='material-icons'
													data-toggle='tooltip'
													title='Delete'
													onClick={() => {
														if (
															window.confirm(
																'Are you sure you wish to delete this traveler?'
															)
														)
															handleDelete(traveler.id);
													}}>
													&#xE872;
												</i>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				{travelers.length === 0 && (
					<h2 className='no-data'>No Travelers Found!</h2>
				)}
				<button
					className='btn btn-success margin-bottom-md'
					onClick={displayAdd}>
					Add Traveler
				</button>
				<Add onAddTrav={fetchAllUsers} />
				<Edit id={editId} onEditTrav={fetchAllUsers} />
			</main>
		</div>
	);
};

export default ManagTrav;
