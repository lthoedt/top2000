import React from 'react';

import { BlockTitle, Block } from 'framework7-react';

import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player'

import { useDispatch, useSelector } from 'react-redux';

import { playingSongGet } from '../actions/playingActions';
import Cover from '../components/Cover';

export default function Playing() {

	const dispatch = useDispatch();

	const playing = useSelector(state => state.playing);

	if (playing.status === "unloaded") dispatch(playingSongGet());

	if (playing.refreshed === false) {
		setTimeout(() => {
			dispatch(playingSongGet());
			dispatch({ type: "PLAYING_REFRESHED_SET", refreshed: false })
		}, 10000);
		dispatch({ type: "PLAYING_REFRESHED_SET", refreshed: true })
	}

	return (
		<div className="page" data-page="Playing">
			<div className="page-content" style={{ padding: 0 }}>
				<div style={{ height: '100%', width: '100%', backgroundImage: `url(${playing.song.image})`, backgroundPosition: 'center', position: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', filter: 'blur(50px)', zIndex: '-9' }}><div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div></div>

				<BlockTitle>Wat speelt er nu?</BlockTitle>
				<Cover src={playing.song.image} />
				<div style={{ textAlign: 'center' }}>
					<ReactAudioPlayer
						src="https://icecast.omroep.nl/radio2-bb-mp3"
						// autoPlay
						controls
						open
					/>
				</div>

				<div className="centerContent" style={{ flexDirection: 'column' }}>
					<span className="title">{playing.song.title}</span>
					<span className="subTitle">{playing.song.artist}</span>
				</div>

				<BlockTitle>Live studio</BlockTitle>

				<Block>
					<div className="centerContent">
						<ReactPlayer
							url='https://nl-ams-p5-am5.cdn.streamgate.nl/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDg0NjUyMjQsInVyaSI6IlwvbGl2ZVwvbnBvXC91XC9ucG9cL25vZHJtXC9kYXNoX3VuZW5jcnlwdGVkXC9ucG8tdnNyLTJcLzBcLzBcLzBcL25wby12c3ItMi5pc21sIiwidmlld2VyIjoiYzVlYjM0OTlhNWU5MDNkYWNjNjIzNGZjNjFkM2RjYzIzMjIwZGZiMCIsInJpZCI6IjYxYWQyMTcifQ.KVI1wXAYMlTpH0Of5UVYmN7Qp9SWGnHWrWXTbw4CUV0/live/npo/u/npo/nodrm/dash_unencrypted/npo-vsr-2/0/0/0/npo-vsr-2.isml/stream.mpd'
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