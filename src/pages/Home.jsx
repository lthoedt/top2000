import React from 'react';

import Tabbar from '../components/Tabbar';

import { Page, Toolbar, Tabs, Tab } from 'framework7-react';

export default function Home() {
	return (
		<Page name="home">
			<Toolbar tabbar labels bottom>
				<Tabbar />
			</Toolbar>
			{/* <Tabs swipeable>
				<Tab id="tab-1" className="page-content" tabActive>
					<List />
				</Tab>
				<Tab id="tab-2" className="page-content">
					<Playingpage />
				</Tab>
				<Tab id="tab-3" className="page-content">
					<Reminders />
				</Tab>
				<Tab id="tab-4" className="page-content">
					<Create />
				</Tab>
			</Tabs> */}
			<Tabs swipeable routable>
				<Tab id="tab-1" className="page-content tab">
					{/* <List /> */}
				</Tab>
				<Tab id="tab-2" className="page-content tab">
					{/* <Playingpage /> */}
				</Tab>
				<Tab id="tab-3" className="page-content tab">
					{/* <Reminders /> */}
				</Tab>
				<Tab id="tab-4" className="page-content tab">
					{/* <Create /> */}
				</Tab>
				<Tab id="tab-5" className="page-content tab">
					{/* <Create /> */}
				</Tab>
			</Tabs>
		</Page>
	);
}