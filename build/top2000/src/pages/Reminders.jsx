import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BlockTitle, Navbar } from 'framework7-react';

import SongList from '../components/SongList'

import { remindersGet } from '../actions/remindersActions';

export default function Reminders() {

	const dispatch = useDispatch();

	const state = useSelector(state => state.reminders);

	if (state.status === "unloaded") dispatch(remindersGet());

	return (
		<div className="page" data-page="Reminders">
			<div className="page-content" style={{ padding: 0 }}>
				<Navbar style={{ position: 'sticky', top: 0 }} title="Jouw reminders" />
				<BlockTitle>Liedjes</BlockTitle>
				<SongList songs={state.songs} reminders={state.songs} />
			</div>
		</div>
	);
}