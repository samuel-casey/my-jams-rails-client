import React, { useState, useEffect } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './App.scss';
import { Route, Link, Switch } from 'react-router-dom';
import Playlist from './Components/Playlist/Playlist';
import FavsList from './Components/FavsList/FavsList';
import Form from './Components/Form/Form';

function App() {
	const url = 'http://localhost:3000';

	const [list, setList] = React.useState([]);
	const [favs, setFavs] = React.useState([]);
	const [updateCount, setUpdateCount] = useState(0);

	const emptySong = {
		artist: '',
		title: '',
		length_mins_seconds: '',
	};

	const [selectedSong, setSelectedSong] = React.useState(emptySong);
	const selectSong = (song) => {
		setSelectedSong(song);
	};

	const getSongs = () => {
		fetch(url + '/songs')
			.then((response) => response.json())
			.then((data) => {
				setList(data);
			});
	};

	const handleCreate = (newSong) => {
		fetch(url + '/songs', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newSong),
		}).then((response) => getSongs());
	};

	const handleUpdate = (song) => {
		fetch(url + '/songs/' + song.id, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(song),
		}).then((response) => {
			const newFav = favs.filter((fav) => {
				console.log(fav.id, song.id);
				return fav.id === song.id;
			});

			let newFavs;
			// if the updated song was in faves
			if (newFav[0]) {
				// replace newFav with data passed from form
				newFavs = favs.splice(favs.indexOf(newFav[0]), 1, song);
			}
			console.log(newFavs, 'New Favs', favs);
			getSongs();
			setFavs([...favs]);
		});
	};

	const handleDelete = (song) => {
		fetch(url + '/songs/' + song.id, {
			method: 'delete',
		}).then((response) => {
			const newDeleted = favs.filter((deleted) => {
				console.log(deleted.id, song.id);
				return deleted.id === song.id;
			});

			let newFavs;
			// if a song was deleted and the deleted song is in favs
			if (newDeleted[0] && favs.indexOf(newDeleted[0] !== -1)) {
				// remove the deleted song from faves
				newFavs = favs.splice(favs.indexOf(newDeleted[0]), 1);
			}
			getSongs();
			setFavs([...favs]);
		});
	};

	const handleSave = (song) => {
		const newFavs = [...favs];

		// add song if not in favs

		// THIS IS NOT WORKING CORRECTLY FOR SONGS IN PLAYLIST
		if (!newFavs.includes(song)) {
			// console.log(newFavs.indexOf(song));
			newFavs.push(song);
			console.log('newFavs', newFavs);
			// remove song if already in favs
		} else {
			newFavs.splice(newFavs.indexOf(song), 1);
			// console.log(newFavs);
		}
		setFavs(newFavs);
	};

	useEffect(() => {
		getSongs();
	}, [selectedSong, favs]);

	useEffect(() => {
		// map over favsList to create a new array
		// find song in favs, find song in list
		// update favs to have selectedSong
	}, [updateCount]);

	return (
		<div className='App'>
			<Link to='/'>
				<header>
					<div className='brand'>
						<img src={require('./music_folder.png')} alt='logo' />
						<h1>My Jams</h1>
					</div>
					<h2>FOR YOUR FAVORITE JAMS</h2>
				</header>
			</Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<>
								<Playlist
									{...rp}
									list={list}
									selectSong={selectSong}
									handleDelete={handleDelete}
									handleSave={handleSave}
								/>
								<FavsList
									{...rp}
									favs={favs}
									handleSave={handleSave}
									handleDelete={handleDelete}
									selectSong={selectSong}
								/>
							</>
						)}
					/>

					<Route
						path='/create'
						render={(rp) => (
							<>
								<Form {...rp} song={emptySong} handleSubmit={handleCreate} />
								<Playlist
									{...rp}
									list={list}
									selectSong={selectSong}
									handleDelete={handleDelete}
									handleSave={handleSave}
								/>
								<FavsList
									{...rp}
									favs={favs}
									handleSave={handleSave}
									handleDelete={handleDelete}
									selectSong={selectSong}
								/>
							</>
						)}
					/>

					<Route
						path='/edit'
						render={(rp) => (
							<>
								<Form
									{...rp}
									selectSong={selectSong}
									song={selectedSong}
									handleSubmit={handleUpdate}
								/>
								<Playlist
									{...rp}
									list={list}
									selectSong={selectSong}
									handleDelete={handleDelete}
									handleSave={handleSave}
								/>
								<FavsList
									{...rp}
									favs={favs}
									selectSong={selectSong}
									handleSave={handleSave}
									handleDelete={handleDelete}
								/>
							</>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;
