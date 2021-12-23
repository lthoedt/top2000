import React from 'react';

import { BlockTitle, Block } from 'framework7-react';

import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player'

import { useDispatch, useSelector } from 'react-redux';

import { playingSongGet } from '../actions/playingActions';
import Cover from '../components/Cover';

export default function Playing() {

	const dispatch = useDispatch();

	const state = useSelector(state => state.playing);

	if (state.status === "unloaded") dispatch(playingSongGet());

	if (state.refreshed === false) {
		setTimeout(() => {
			dispatch(playingSongGet());
			dispatch({ type: "PLAYING_REFRESHED_SET", refreshed: false })
		}, 10000);
		dispatch({ type: "PLAYING_REFRESHED_SET", refreshed: true })
	}

	return (
		<div className="page" data-page="Playing">
			<div className="page-content" style={{ padding: 0 }}>
				<div style={{ height: '100%', width: '100%', backgroundImage: `url(${state.song.cover_url})`, backgroundPosition: 'center', position: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', filter: 'blur(50px)', zIndex: '-9' }}><div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div></div>

				<BlockTitle>Wat speelt er nu?</BlockTitle>
				<Cover src={state.song.cover_url} />
				<div style={{ textAlign: 'center' }}>
					<ReactAudioPlayer
						src="https://icecast.omroep.nl/radio2-bb-mp3"
						// autoPlay
						controls
						open
					/>
				</div>

				<div className="centerContent" style={{ flexDirection: 'column' }}>
					<span className="title">{state.song.title}</span>
					<span className="subTitle">{state.song.artist}</span>
				</div>

				<BlockTitle>Live studio</BlockTitle>

				<Block>
					<div className="centerContent">
						<ReactPlayer
							url={state.stream.src}
							controls
							height="100%"
							playing={false}
						/>
					</div>
				</Block>
					</div>
		</div>
	);
}