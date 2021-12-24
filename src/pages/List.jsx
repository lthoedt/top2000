import React from 'react';

import { Navbar, Subnavbar, Searchbar } from 'framework7-react';

import SongList from '../components/SongList'

import { useDispatch, useSelector } from 'react-redux';

import { songsGet } from '../actions/listActions';

let prevScroll = 0;

// let locationBeforeScroll = -1;

export default function List() {

    const dispatch = useDispatch();

    const list = useSelector(state => state.list);

    const loadSongs = songsGet();


    if (list.status === "unloaded") {
        dispatch(loadSongs);
    }

    const LoadMoreSongs = (e) => {
        if (list.status !== "loaded" || list.search != "") return;

        const node = e.target; // gets the html element
        const treshhold = 250;
        const isBottom = node.scrollTop + node.offsetHeight >= node.scrollHeight - treshhold;
        const isTop = node.scrollTop <= treshhold;

        const loadUp = isTop && list.loadIndex > 0;
        const loadDown = isBottom && list.loadIndex < 2000 / list.loadStep;
        const scrolledUp = prevScroll > node.scrollTop;

        // console.log(`scrolledUp: ${scrolledUp}, prevScroll: ${prevScroll}, isTop: ${isTop}, loadUp: ${loadUp}`)

        if ((scrolledUp &&!loadUp) || (!scrolledUp && !loadDown)) {
            prevScroll = node.scrollTop;
        }

        // if (loadUp || loadDown) {
        //     locationBeforeScroll = node.scrollTop;
        // }

        if (scrolledUp) {
            if (loadUp) {
                dispatch({ type: "LIST_LOAD_UP" });
                dispatch(loadSongs);
                prevScroll = node.scrollHeight
            }
        } else {
            if (loadDown) {
                dispatch({ type: "LIST_LOAD_DOWN" });
                dispatch(loadSongs);
                prevScroll = 0;
            }
        }
    }

    const searchSongs = (e) => {
        const search = e.target.value;

        dispatch({ type: "LIST_SEARCH", search: search });

        // ga pas zoeken na 500ms geen input
        if (list.searchTimer === undefined) {
            clearTimeout(list.searchTimer);
            dispatch({
                type: "LIST_SEARCH_TIMER_SET", searchTimer: setTimeout(
                    () => {
                        dispatch({ type: "LIST_STATUS_SET", status: "unloaded" });
                        dispatch({ type: "LIST_SEARCH_TIMER_SET", searchTimer: undefined })
                    },
                    500
                )
            })
        }
    }

    return (
        <div className="page" data-page="List">
            <div className="page-content infinite-scroll-content" onScroll={LoadMoreSongs} style={{ padding: 0 }}>
                <Navbar title={`De lijst van ${new Date().getFullYear()}`} style={{ position: 'sticky', top: 0 }}>
                    <Subnavbar inner={false}>
                        <Searchbar placeholder="Zoek op plek, naam of artiest" style={{ width: '100%' }} onInput={searchSongs} clearButton={true} disableButton={false} />
                    </Subnavbar>
                </Navbar>
                <SongList songs={list.songs} reminders={list.reminders} />
            </div>
        </div>
    );
}