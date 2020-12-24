import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Block, BlockHeader, BlockTitle, Link, Navbar } from 'framework7-react';

import SongList from '../components/SongList'

import { remindersGet } from '../actions/remindersActions';

export default function Reminders() {

	const dispatch = useDispatch();

	const state = useSelector(state => state.reminders);

	if (state.status === "unloaded") dispatch(remindersGet());

	return (
		<div className="page" data-page="Reminders">
			{
				(sessionStorage.username !== undefined)
					?
					<div className="page-content" style={{ padding: 0 }}>
						<Navbar style={{ position: 'sticky', top: 0 }} title="Jouw reminders" />

						<BlockTitle>Liedjes</BlockTitle>
						<SongList songs={state.songs} reminders={state.songs} />

					</div>
					:
					<div className="page-content" style={{ padding: 0 }}>
						<Navbar style={{ position: 'sticky', top: 0 }} title="Jouw reminders" />

						<BlockTitle>Info</BlockTitle>
						<BlockHeader>
							Hier staan jouw reminders wanneer je bent <Link href='/login'>ingelogd</Link>.
						</BlockHeader>

						<Block>
							
							Je kunt bij elk nummer een reminder maken, wanneer dit nummer dan bijna aan de beurt is krijg je hier een mail van!
						</Block>

					</div>
			}
		</div>
	);
}