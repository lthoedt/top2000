import React from 'react';

import { Page, Navbar } from 'framework7-react';

import SongList from '../components/SongList'

import { useDispatch, useSelector } from 'react-redux';

import { songsGet } from '../actions/listActions';

export default () => {

	const dispatch = useDispatch();

	const list = useSelector(state => state.list);

	if (list.status==="unloaded") dispatch(songsGet());

	return (
		<Page name="List">
			<Navbar title={`De lijst van ${new Date().getFullYear()}`} />

			<SongList songs = {list.songs} />

		</Page>
	);
}