import React from 'react';

import Home from './pages/Home';

import { App, View } from 'framework7-react';

const f7params = {
	name: 'top2000 manager',
	id: 'root',
	view: {
		pushState: true,
		pushStateSeparator: ''
	},
	routes: [{
		path: '/',
		component: Home,
	}]
};

export default () => {
	return (
		<App params={f7params} className="theme-dark">
			<View main url="/" />
		</App>
	);
}