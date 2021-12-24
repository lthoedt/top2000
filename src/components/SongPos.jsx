import React from 'react';

import { Icon } from 'framework7-react';

export default function SongPos(props) {
	const pos = props.pos
    const prv = props.prv;
    
	let icon = {};
    
    let isNew = false;

	if (pos===prv || prv===0) {icon = {f7: "star_circle", color: "blue"}; isNew=true}
	else if (pos<prv) icon = {f7: "arrowtriangle_up_fill", color: "green"}
	else icon = {f7: "arrowtriangle_down_fill", color: "red"};

	return (
		<div style={{display: "flex", alignItems: "center", flexDirection: "column"}} >
			<span>{pos}</span>
			<Icon f7={icon} {...icon}></Icon>
			{!isNew && <span>{prv}</span>}
		</div>
	);
}