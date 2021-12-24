const loadStep = 25;

const initialLoginState = {
    status: "unloaded",
    loadIndex: 0,
    loadStep: 25,
    songs: [],
    search: "",
    queryCount: null,
    currentlyPlaying: null,
    audio: null,
    searchTimer: undefined,
    goToLive: false
}

const ListReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case "LIST_STATUS_SET":
            return { ...state, status: action.status };

        case "LIST_LOADED":
            return { ...state, songs: action.songs, reminders: action.reminders, queryCount: action.queryCount };

        case "LIST_LOAD_DOWN":
            if (state.loadIndex === 2000 / loadStep) return state;
            return { ...state, loadIndex: state.loadIndex+1 }

        case "LIST_LOAD_UP":
            if (state.loadIndex === 0) return state;
            return { ...state, loadIndex: state.loadIndex-1 }

        case "LIST_SEARCH":
            return { ...state, search: action.search }

        case "SONG_CURRENTLYPLAYING":
            return { ...state, currentlyPlaying: action.currentlyPlaying }

        case "SONG_AUDIO_SET":
            if (state.audio !== null) state.audio.pause();
            return { ...state, audio: action.audio };

        case "SONG_AUDIO_TOGGLE":
            if (action.play) state.audio.play()
            else state.audio.pause()
            return { ...state, audio: state.audio }

        case "LIST_SEARCH_TIMER_SET":
            return { ...state, searchTimer: action.searchTimer }

        case "LIST_GOTO_PLAYING":
            const position = action.position;

            // const position = 101

            if (position === undefined || position === null) return state;

            return { ...state, loadIndex: Math.floor(position/loadStep), goToLive: true, status: "unloaded"}

        case "LIST_GOTO_PLAYING_RESET":
            return { ...state, goToLive: false}

        default:
            return state;
    }
}

export default ListReducer;