import React from 'react';
import { Link } from 'react-router-dom';
import './Playlist.css';

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
					<button
						className='btn save-song'
						onClick={() => {
							props.handleSave(song);
						}}>
						{'❤️'}
					</button>
					<Link to='/edit'>
						<button
							className='btn edit-song'
							onClick={() => {
								props.selectSong(song);
								props.history.push('/edit');
							}}>
							Edit
						</button>
					</Link>
					<button
						className='btn remove-song'
						onClick={() => {
							props.handleDelete(song);
						}}>
						Delete
					</button>
				</div>
			</div>
		);
	});

	const loading = 'Loading...';

	return (
		<>
			<h3>My Jams</h3>
			<button onClick={handleAddBtnClick}>Add a jam</button>
			{props.list.length > 0 ? loaded : loading}
		</>
	);
}

export default Playlist;
