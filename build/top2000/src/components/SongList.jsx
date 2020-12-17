import React from 'react';

import { List } from 'framework7-react';

import SongListItem from '../components/SongListItem';

export default props => {
	const songComponents = props.songs.map(song => {
		return <SongListItem key = {song.aid} song = {song} />;
	})
	return (
		<List mediaList>
			{songComponents}
		</List>
	);
}