import React from 'react';

import { Navbar, Subnavbar, Searchbar, Tab } from 'framework7-react';

import SongList from '../components/SongList'

import { useDispatch, useSelector } from 'react-redux';

import { songsGet } from '../actions/listActions';

export default function List() {

	const dispatch = useDispatch();

	const list = useSelector(state => state.list);

	const loadSongs = songsGet();

	if (list.status === "unloaded") dispatch(loadSongs);

	const LoadMoreSongs = (e) => {
		const node = e.target; // gets the html element
		const treshhold = 100;
		const isBottom = node.scrollTop + node.offsetHeight >= node.scrollHeight - treshhold;
		
		if (isBottom && list.loadedSongs <= list.queryCount ) {
			if (list.status === "loaded") {
				dispatch({ type: "LIST_LOAD_MORE" });
				dispatch(loadSongs);
			}
		}
	}

	const searchSongs = (e) => {
		const search = e.target.value;

		dispatch({type: "LIST_SEARCH", search: search});
		dispatch({type: "LIST_STATUS_SET", status: "unloaded"});
	}

	return (
		<div className="page" data-page="List">
			<div className="page-content infinite-scroll-content" onScroll={LoadMoreSongs} style={{ padding: 0 }}>
				<Navbar title={`De lijst van ${new Date().getFullYear()}`} style={{position: 'sticky', top: 0}}>
					<Subnavbar inner={false}>
						<Searchbar style={{ width: '100%' }} onInput={searchSongs} />
					</Subnavbar>
				</Navbar>
				<SongList songs={list.songs} />
			</div>
		</div>
	);
}