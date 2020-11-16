import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bulma-components';
import './FavsList.scss';

function FavsList(props) {
	// add full hearts for favs

	const loaded = props.favs.map((fav, index) => {
		return (
			<div className='fav' key={index}>
				<div className='fav-info'>
					<span className='fav-title'>
						<b>Title:</b> {fav.title}
					</span>
					<span className='fav-artist'>
						<b>Artist:</b> {fav.artist}
					</span>
					<span className='fav-time'>
						<b>Time:</b> {fav.length_mins_seconds}
					</span>
				</div>
				<div className='btns'>
					<Button
						className='btn is-primary is-light save-fav'
						onClick={() => {
							props.handleSave(fav);
						}}>
						<i className='fas fa-heart'></i>
					</Button>
					<Link to='/edit'>
						<Button
							className='btn is-primary is-light edit-fav'
							onClick={() => {
								props.selectSong(fav);
								props.history.push('/edit');
							}}>
							Edit
						</Button>
					</Link>
					<Button
						className='button is-primary is-light remove-fav'
						onClick={() => {
							props.handleDelete(fav);
						}}>
						Delete
					</Button>
				</div>
			</div>
		);
	});
	const loading = 'Add favorites to see them here';

	return (
		<>
			<div className='favs-heading'>
				<h3>My Favorite Jams</h3>
			</div>
			{props.favs.length > 0 ? loaded : loading}
		</>
	);
}

export default FavsList;
