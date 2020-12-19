import React from "react";

import { Icon, ListItem } from 'framework7-react';
import SongPos from './SongPos';

import { useDispatch, useSelector } from 'react-redux';

export default function SongListItem(props) {
	const song = props.song;

	const currentlyPlaying = useSelector(state => state.list.currentlyPlaying);
	const dispatch = useDispatch();

	const thisSongIsPlaying = currentlyPlaying === song.aud;

	const audio = useSelector(state => state.list.audio);

	const toggleSong = (url) => {
		if (audio === null || audio.src !== url) dispatch({ type: "SONG_AUDIO_SET", audio: new Audio(song.aud) });
		dispatch({ type: "SONG_CURRENTLYPLAYING", currentlyPlaying: (currentlyPlaying === url) ? null : url })

		dispatch({ type: "SONG_AUDIO_TOGGLE", play: currentlyPlaying !== url })
	}

	return (
		<ul>
			<ListItem
				// link={`https://www.nporadio2.nl${song.url}`}
				target="_blank"
				title={song.s}
				subtitle={song.a}
				after={song.yr}
				className={(thisSongIsPlaying) ? "active" : ""}
				style={{ transitionDuration: "200ms" }}
			// external
			>
				<SongPos slot="media" song={song} />
				<div slot="media" onClick={() => toggleSong(song.aud)}>
					<img src={song.img} alt={`cover van ${song.s}`} width="80" />
					{(thisSongIsPlaying)
						? <Icon f7="pause_circle" style={{ width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3em", position: "absolute", transform: "translateY(-50%)", top: "50%" }}></Icon>
						: <Icon f7="play_circle" style={{ width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3em", position: "absolute", transform: "translateY(-50%)", top: "50%" }}></Icon>
					}
				</div>
			</ListItem>
		</ul>
	);
}