import React from 'react';

import { Icon, List, Preloader } from 'framework7-react';

import SongListItem from '../components/SongListItem';

import { useSelector } from 'react-redux';

export default function SongList(props) {

    const listState = useSelector(state => state.list);

	const loading = listState.status;
	const queryCount = listState.queryCount;

	const songComponents = props.songs.map(song => {
		let isReminder = false;
		for (const reminder of props.reminders) {
			if (reminder.id===song.id) {
				isReminder=true;
				break;
			}
		}
		return <SongListItem key={song.id} song={song} reminder={isReminder} />;
	})

	return (
		<List className='songs' mediaList>
			{songComponents}
			{(loading === "loading" &&
				<div style={{ textAlign: "center", marginTop: "3vh" }}>
					<Preloader style={{ textAlign: "center" }} size={42}></Preloader>
				</div>
			)}
			{(queryCount===0 &&
				<div style={{textAlign: "center", marginTop: '10vh'}} >
					<h3>Er zijn geen resultaten.</h3>
					<Icon f7="xmark_circle_fill"></Icon>
				</div>
			)}
		</List>
	);
}