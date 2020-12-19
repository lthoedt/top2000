import React from 'react';

import List from './List';
import Playingpage from './Playing';

import Tabbar from '../components/Tabbar';

import { Page, Toolbar, Tabs, Tab, Block } from 'framework7-react';

export default function Home() {
	return (
		<Page name="home">
			<Toolbar tabbar labels bottom>
				<Tabbar />
			</Toolbar>
			<Tabs swipeable>
				<Tab id="tab-1" className="page-content" tabActive>
					<List />
				</Tab>
				<Tab id="tab-2" className="page-content">
					<Playingpage />
				</Tab>
				<Tab id="tab-3" className="page-content">
					<Block>
						<p>Tab 3 content</p>
					...
				</Block>
				</Tab>
			</Tabs>
		</Page>
	);
}