import React from 'react';

export default function Cover(props) {

	return (
		<div style={{width: "100%", height: "fit-content", display: "flex", justifyContent: "center", alignItems: "center"}}>
			<img src={props.src} alt="song cover" style={{margin: '4vh 1em', objectFit: "cover", width: '70%', borderRadius: "20px"}} />
		</div>
	);
}