import React from 'react';

import { Navbar } from 'framework7-react';

import SongList from '../components/SongList'

import { useDispatch, useSelector } from 'react-redux';

import { songsGet } from '../actions/listActions';

export default () => {

	const dispatch = useDispatch();

	const list = useSelector(state => state.list);

	const loadSongs = songsGet();

	if (list.status==="unloaded") dispatch(loadSongs);

	const LoadMoreSongs = (e) => {
		const node = e.target; // gets the html element
		const treshhold = 100;
		const isBottom = node.scrollTop + node.offsetHeight >= node.scrollHeight-treshhold;
		
		if (isBottom) {
			if (list.status==="loaded") {
				dispatch({type: "LIST_LOAD_MORE"});
				dispatch(loadSongs);
			}
		}
	}

	return (
		<div className="page" data-page="List">
			<Navbar title={`De lijst van ${new Date().getFullYear()}`} />

			<div className="page-content infinite-scroll-content" onScroll={LoadMoreSongs}>
				<SongList songs = {list.songs} />
			</div>
		</div>
	);
}