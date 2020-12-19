import React from 'react';

import ReactAudioPlayer from 'react-audio-player';

import { useDispatch, useSelector } from 'react-redux';

import { playingSongGet } from '../actions/playingActions';
import Cover from '../components/Cover';

export default function Playing() {

	const dispatch = useDispatch();

	const playing = useSelector(state => state.playing);

	if (playing.status === "unloaded") dispatch(playingSongGet());

	return (
		<div className="page" data-page="Playing">
			<div className="page-content" style={{ padding: 0 }}>
				<div style={{ height: '100%', width: '100%', backgroundImage: `url(${playing.song.image})`, backgroundPosition: 'center', position: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', filter: 'blur(50px)', zIndex: '-9' }}><div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div></div>

				<Cover src={playing.song.image} />
				<div style = {{textAlign: 'center'}}>
					<ReactAudioPlayer
						src="https://icecast.omroep.nl/radio2-bb-mp3"
						// autoPlay
						controls
						open
					/>
				</div>

				<div className = "centerContent" style={{flexDirection: 'column'}}>
					<span className = "title">{playing.song.title}</span>
					<span className = "subTitle">{playing.song.artist}</span>
				</div>

			</div>
		</div>
	);
}