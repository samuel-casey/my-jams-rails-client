import React, { useState } from 'react';
import './Form.css';

function Form(props) {
	const [formData, setFormData] = useState(props.song);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent Form from Refreshing
		console.log('formdata: ', formData);
		props.handleSubmit(formData); // Submit to Parents desired function
		// props.history.push('/'); //Push back to display page
	};

	return (
		<div className='song-form'>
			<h3>Add a new song</h3>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='title'
					value={formData.song}
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
					name='time'
					value={formData.time}
					placeholder='Time'
					onChange={handleChange}
				/>
				<input type='submit' value='Add song' />
			</form>
		</div>
	);
}

export default Form;
