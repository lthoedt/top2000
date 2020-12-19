import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from 'framework7-react';

export default function Reminders() {

	const dispatch = useDispatch();

	return (
		<div className="page" data-page="Reminders">
			<div className="page-content" style={{ padding: 0 }}>
				<Navbar title="Jouw reminders">
					
				</Navbar>
			</div>
		</div>
	);
}