import React, { useState } from 'react';
import './Form.css';

function Form(props) {
	const [formData, setFormData] = useState(props.song);

	const route = props.history.location.pathname;

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent Form from Refreshing
		console.log('formdata: ', formData);
		props.handleSubmit(formData); // Submit to Parents desired function
		props.history.push('/'); //Push back to display page
	};

	let formHeading;

	if (route === '/edit') {
		formHeading = 'Edit a song';
	} else if (route === '/create') {
		formHeading = 'Add a new song';
	}

	return (
		<div className='song-form'>
			<h3>{formHeading}</h3>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='title'
					value={formData.title}
					placeholder='Title'
					onChange={handleChange}
				/>
				<input
					type='text'
					name='artist'
					value={formData.artist}
					placeholder='Artist'
					onChange={handleChange}
				/>
				<input
					type='text'
					name='length_mins_seconds'
					value={formData.length_mins_seconds}
					placeholder='Time'
					onChange={handleChange}
				/>
				<input type='submit' value='Add song' />
			</form>
		</div>
	);
}

export default Form;