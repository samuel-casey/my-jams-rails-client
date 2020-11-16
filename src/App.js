import React from 'react';
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

	const emptySong = {
		artist: '',
		title: '',
		length: 0,
	};

	const [selectedSong, setSelectedSong] = React.useState(emptySong);
	const selectSong = (song) => {
		console.log(song);
		setSelectedSong(song);
	};

	const getSongs = () => {
		fetch(url + '/songs')
			.then((response) => response.json())
			.then((data) => {
				setList(data);
			});
	};
	React.useEffect(() => {
		getSongs();
	}, [selectedSong, favs]);

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
			getSongs();
		});
	};

	const handleDelete = (song) => {
		fetch(url + '/songs/' + song.id, {
			method: 'delete',
		}).then((response) => getSongs());
	};

	const handleSave = (song) => {
		const newFavs = [...favs];

		// add song if not in favs
		if (newFavs.indexOf(song) === -1) {
			newFavs.push(song);
			// remove song if already in favs
		} else {
			newFavs.splice(newFavs.indexOf(song), 1);
			console.log(newFavs);
		}
		getSongs();
		setFavs(newFavs);
	};

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
								<Form {...rp} song={selectedSong} handleSubmit={handleCreate} />
								<Playlist
									{...rp}
									list={list}
									song={selectedSong}
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
									handleUpdate={handleUpdate}
								/>
								<Playlist
									{...rp}
									list={list}
									song={selectedSong}
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
				</Switch>
			</main>
		</div>
	);
}

export default App;
