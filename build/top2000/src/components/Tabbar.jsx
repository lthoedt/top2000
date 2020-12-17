import React from 'react';

import { Toolbar, Link } from 'framework7-react';

export default () => {
	return (
		<Toolbar tabbar labels bottom>
			<Link tabLink="#tab-1" iconF7="list_number" text="Lijst" tabLinkActive ></Link>
			<Link tabLink="#tab-2" iconF7="play" text="Nu spelend"></Link>
			<Link tabLink="#tab-3" iconF7="bell" text="Mijn reminders"></Link>
		</Toolbar>
	);
}