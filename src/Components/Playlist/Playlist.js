import React from 'react';
import { Link } from 'react-router-dom';
import './Playlist.css';

function Playlist(props) {

	const loaded = props.list.map((song, index) => {
		return (
			<div className='song' key={index}>
				<div className='song-info'>
					<span className='song-title'>
						<b>Title:</b> {song.title}
					</span>
					<span className='song-artist'>
						<b>Artist:</b> {song.artist}
					</span>
					<span className='song-time'>
						<b>Time:</b> {song.time}
					</span>
				</div>
				<div className='btns'>
					<Link to='/edit'>
						<button className='btn save-song' onClick={() => {props.handleSave(song)}}>
							{'❤️'}
						</button>
					</Link>
					<button className='btn edit-song' onClick={
						() => {
							console.log('song', song)
						props.selectSong(song);
						props.history.push('/edit')
						}}>
						Edit
					</button>
					<button className='btn remove-song' onClick={() => {props.handleDelete(song)}}>
						Delete
					</button>
				</div>
			</div>
		);
	});

	const loading = 'Loading...';

	return (
		<>
			<h3>My Playlist</h3>
			{props.list.length > 0 ? loaded : loading}
		</>
	);
}

export default Playlist;
