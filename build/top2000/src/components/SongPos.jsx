import React from 'react';

import { Icon } from 'framework7-react';

export default props => {
	const song = props.song;

	let icon = {};

	if (song.pos===song.prv) icon = {f7: "largecircle_fill_circle", color: "white"}
	else if (song.pos<song.prv) icon = {f7: "arrowtriangle_up_fill", color: "green"}
	else icon = {f7: "arrowtriangle_down_fill", color: "red"};

	return (
		<div style={{display: "flex", alignItems: "center", flexDirection: "column"}} >
			<span>{song.pos}</span>
			<Icon f7={icon} {...icon}></Icon>
			<span>{song.prv}</span>
		</div>
	);
}