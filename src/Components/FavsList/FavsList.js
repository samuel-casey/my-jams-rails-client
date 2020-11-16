import React from 'react';
import './FavsList.css';

function FavsList(props) {
	console.log('favs', props)
	const loaded = props.favs.map((fav, index) => {
		return (
			<div className='fav' key={index}>
				<div>
					<span className='fav-title'>
						<b>Title:</b> {fav.title}
					</span>
					<span className='fav-artist'>
						<b>Artist:</b> {fav.artist}
					</span>
					<span className='fav-time'>
						<b>Time:</b> {fav.time}
					</span>
				</div>
			</div>
		);
	});
	const loading = 'Loading...';

	return (
		<>
			<h3>My Fave List</h3>
			{props.favs.length > 0 ? loaded : loading}
		</>)
}

export default FavsList;
