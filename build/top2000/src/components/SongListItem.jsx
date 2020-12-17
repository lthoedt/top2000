import React from 'react';

import { ListItem } from 'framework7-react';
import SongPos from './SongPos';

export default props => {
	const song = props.song;
	return (
		<ul>
			<ListItem
				link={`https://www.nporadio2.nl${song.url}`}
				title={song.s}
				subtitle={song.a}
				after={song.yr}
				text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
			>
				<SongPos slot="media" song={song} />
				<img slot="media" src={song.img} width="80" />
			</ListItem>
		</ul>
	);
}