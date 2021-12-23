import React from 'react';

import { Icon } from 'framework7-react';

export default function SongPos(props) {
	const pos = props.pos
    const prv = props.prv;

	let icon = {};

	if (pos===prv) icon = {f7: "largecircle_fill_circle", color: "white"}
	else if (pos<prv) icon = {f7: "arrowtriangle_up_fill", color: "green"}
	else icon = {f7: "arrowtriangle_down_fill", color: "red"};

	return (
		<div style={{display: "flex", alignItems: "center", flexDirection: "column"}} >
			<span>{pos}</span>
			<Icon f7={icon} {...icon}></Icon>
			<span>{prv}</span>
		</div>
	);
}