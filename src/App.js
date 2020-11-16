import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Playlist from './Components/Playlist/Playlist';
import FavsList from './Components/FavsList/FavsList';
import Form from './Components/Form/Form';

function App() {
	const url = 'https://tunr-backend.herokuapp.com/api';

	const [list, setList] = React.useState([]);
	const [favs, setFavs] = React.useState([]);

	const emptySong = {
		artist: '',
		title: '',
		length: 0,
	};

	const [selectedSong, setSelectedSong] = React.useState(emptySong);
	const selectSong = (song) => {
		setSelectedSong(song);
	};
	console.log('selectSong', selectSong)

	const getSongs = () => {
		fetch(url + '/songs/')
			.then((response) => response.json())
			.then((data) => {
				console.log('data', data)
				setList(data);
			});
	};
	React.useEffect(() => {
		getSongs();
	}, []);


	const handleCreate = (newSong) => {
		fetch(url + '/songs/', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newSong),
		}).then((response) => getSongs());
	};

	const handleUpdate = (song) => {
		fetch(url + '/songs/' + song._id, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(song),
		}).then((response) => getSongs());
	};

	const handleDelete = (song) => {
		console.log('song', song)
		fetch(url + '/songs/' + song._id, {
			method: 'delete',
		}).then((response) => getSongs());
	};

	const handleSave = (song) => {
		const newFavs = [...favs];
		newFavs.push(song);
		setFavs(newFavs);
	};

	return (
		<>
			<header>
				<h1>TUNR</h1>
				<h2>FOR ALL YOUR PLAYLIST NEEDS</h2>
			</header>
			<main>
				<Switch>
					<Route
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
								<FavsList {...rp} favs={favs} />
								<Form {...rp} song={selectedSong} handleSubmit={handleCreate} />
							</>
						)}
					/>

					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								selectSong={selectSong}
								song={selectedSong}
								handleSubmit={handleCreate}
								handleUpdate={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</>
	);
}

export default App;
