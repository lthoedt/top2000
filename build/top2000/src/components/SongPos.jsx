import React from 'react';

import { Icon } from 'framework7-react';

export default function SongPos(props) {
	const song = props.song;

	let icon = {};

	let delta;
	if (song.pos === song.prv) {
		icon = { f7: "largecircle_fill_circle", color: "white" }
		delta=' ± 0'
	} else if (song.pos < song.prv) {
		icon = { f7: "arrowtriangle_up_fill", color: "green" }
		delta=`+ ${song.prv-song.pos}`;
	} else {
		icon = { f7: "arrowtriangle_down_fill", color: "red" };
		delta=`- ${song.pos-song.prv}`;
	}

	return (
		<div style={{display:'flex', flexDirection: 'row', paddingRight: '2vw'}}>
			<div style={{ display: "flex", alignItems: "center", flexDirection: "column" }} >
				<span>{song.pos}</span>
				<Icon f7={icon} {...icon}></Icon>
				<span>{song.prv}</span>
			</div>
			<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
				{delta}
			</div>
		</div>
	);
}