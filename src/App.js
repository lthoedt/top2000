import React from 'react';

import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import List from './pages/List';
import Playing from './pages/Playing';
import Reminders from './pages/Reminders';


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
		tabs: [
			{
				path: '/',
				id: 'tab-1',
				component: List
			},
			{
				path: '/playing',
				id: 'tab-2',
				component: Playing
			},
			{
				path: '/reminders',
				id: 'tab-3',
				component: Reminders
			},
			{
				path: '/login',
				id: 'tab-4',
				component: Login
			},
			{
				path: '/create',
				id: 'tab-5',
				component: Create
			}
		]
	},
	{
		path: '/logout',
		redirect: function (route, resolve, reject) {
			sessionStorage.clear()
			resolve('/');
		}
	}]
};

export default function app() {
	return (
		<App params={f7params} className="theme-dark">
			<View main url="/" />
		</App>
	);
}