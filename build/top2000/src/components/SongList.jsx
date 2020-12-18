import React from 'react';

import { List, Preloader } from 'framework7-react';

import SongListItem from '../components/SongListItem';

export default props => {
	const songComponents = props.songs.map(song => {
		return <SongListItem key={song.aid} song={song} />;
	})
	return (
		<List mediaList>
			{songComponents}
			<div style={{ textAlign: "center", marginTop: "3vh" }}><Preloader style={{ textAlign: "center" }} size={42}></Preloader></div>
		</List>
	);
}