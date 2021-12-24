const axios = require('axios').default;
const URIs = require('../URIs');

export const songsGet = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: "LIST_STATUS_SET",
            status: "loading"
        });

        const state = getState().list;

        try {
            let min,max;

            min = max = state.loadIndex * state.loadStep;
            // *2 makes sure that there ar 2 lists stacked so you never see a blank screen
            max += state.loadStep*2;

            const songs = (await axios.get(`${URIs.api}/songs?min=${min}&max=${max}&search=${state.search}`, { headers: { "Access-Control-Allow-Private-Network": "true", 'Access-Control-Allow-Origin': '*', } }));

            let reminders = [];

            try {
                if (sessionStorage.username !== undefined) reminders = (await axios.get(`${URIs.api}/users/${sessionStorage.username}/reminders/songs`, { headers: { "Access-Control-Allow-Private-Network": "true", 'Access-Control-Allow-Origin': '*', } })).data.data;
            } catch (err) {

            }

            dispatch({
                type: "LIST_LOADED",
                songs: songs.data.songs,
                reminders: reminders,
                queryCount: songs.data.queryCount
            });
            dispatch({
                type: "LIST_STATUS_SET",
                status: "loaded"
            })
        } catch (err) {
            dispatch({
                type: "LIST_STATUS_SET",
                status: "failed"
            });
        }
    }
}