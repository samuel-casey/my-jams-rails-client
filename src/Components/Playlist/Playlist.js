import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bulma-components';
import './Playlist.scss';

function Playlist(props) {
	const handleAddBtnClick = () => {
		props.history.push('/create');
	};

	const loaded = props.list.map((song, index) => {
		return (
			<div className='song' song-id={song.id} key={index}>
				<div className='song-info'>
					<span className='song-title'>
						<b>Title:</b> {song.title}
					</span>
					<span className='song-artist'>
						<b>Artist:</b> {song.artist}
					</span>
					<span className='song-time'>
						<b>Time:</b> {song.length_mins_seconds}
					</span>
				</div>
				<div className='btns'>
					<Button
						className='btn is-primary is-light save-song'
						onClick={() => {
							props.handleSave(song);
						}}>
						<i className='far fa-heart'></i>
					</Button>
					<Link to='/edit'>
						<Button
							className='btn is-primary is-light edit-song'
							onClick={() => {
								props.selectSong(song);
								props.history.push('/edit');
							}}>
							Edit
						</Button>
					</Link>
					<Button
						className='button is-primary is-light remove-song'
						onClick={() => {
							props.handleDelete(song);
						}}>
						Delete
					</Button>
				</div>
			</div>
		);
	});

	const loading = (
		<>
			<h4>Loading</h4>
			<progress className='progress is-small is-warning' max='100'></progress>
		</>
	);

	return (
		<>
			<div className='jams-heading'>
				<h3>My Jams</h3>
				<Button className='is-warning is-light' onClick={handleAddBtnClick}>
					Add a jam
				</Button>
			</div>
			{props.list.length > 11 ? loaded : loading}
		</>
	);
}

export default Playlist;
