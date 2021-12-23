import React from "react";

import { Icon, ListItem, Chip } from 'framework7-react';
import SongPos from './SongPos';

import { useDispatch, useSelector } from 'react-redux';

import { remindersAdd, remindersRemove } from '../actions/remindersActions';

export default function SongListItem(props) {
    const song = props.song;

    const currentlyPlaying = useSelector(state => state.list.currentlyPlaying);
    const currentSongOnAir = useSelector(state => state.playing.song);

    const dispatch = useDispatch();

    const thisSongIsPlaying = currentlyPlaying === song.trackPreviewUrl || (currentSongOnAir.artist === song.artist && currentSongOnAir.title === song.title);

    const audio = useSelector(state => state.list.audio);

    const toggleSong = (url) => {
        if (audio === null || audio.src !== url) dispatch({ type: "SONG_AUDIO_SET", audio: new Audio(url) });
        dispatch({ type: "SONG_CURRENTLYPLAYING", currentlyPlaying: (currentlyPlaying === url) ? null : url })

        dispatch({ type: "SONG_AUDIO_TOGGLE", play: currentlyPlaying !== url })
    }

    return (
        <ul>
            <ListItem
                // link={`https://www.nporadio2.nl${song.url}`}
                target="_blank"
                title={song.title}
                subtitle={song.artist}
                after={song.yr}
                className={(thisSongIsPlaying) ? "active" : ""}
                style={{ transitionDuration: "200ms" }}
            // external
            >
                <SongPos slot="media" pos={song.position} prv={song.lastPosition} />
                <div slot="media" onClick={() => toggleSong(song.trackPreviewUrl)}>
                    <img src={song.imageUrl} alt={`cover van ${song.title}`} width="80" />
                    {(thisSongIsPlaying)
                        ? <Icon f7="pause_circle" style={{ width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3em", position: "absolute", transform: "translateY(-50%)", top: "50%" }}></Icon>
                        : <Icon f7="play_circle" style={{ width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3em", position: "absolute", transform: "translateY(-50%)", top: "50%" }}></Icon>
                    }
                </div>
                {(sessionStorage.username === undefined)
                    ?
                    <Chip text="Reminder" color="orange" onClick={() => window.location.href = "/login"} outline>
                        <Icon slot="media" f7="person_alt"></Icon>
                    </Chip>
                    :
                    (props.reminder)
                        ?
                        <Chip text="Reminder" color="blue" onClick={() => dispatch(remindersRemove(song.id))} outline deleteable>
                            <Icon slot="media" f7="checkmark_alt"></Icon>
                        </Chip>
                        :
                        <Chip text="Reminder" color="green" onClick={() => dispatch(remindersAdd(song.id))} outline>
                            <Icon slot="media" f7="plus"></Icon>
                        </Chip>
                }
            </ListItem>
        </ul>
    );
}