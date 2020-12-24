const initialLoginState = {
	status: "unloaded",
	loadedSongs: 50,
	songs: [],
	search: "",
	queryCount: null,
	currentlyPlaying: null,
	audio: null,
	searchTimer: undefined
}

const ListReducer = ( state = initialLoginState, action ) => {
    // Note how all branches of the switch-statement always return
    // (a new version of) the state. Reducers must always return a (new) state.

    switch(action.type) {
        case "LIST_STATUS_SET":
		return { ...state, status: action.status };
		
		case "LIST_LOADED":
		return { ...state, songs: action.songs, reminders: action.reminders, queryCount: action.queryCount};

		case "LIST_LOAD_MORE":
			const loadedSongs = state.loadedSongs + 50;
		return { ...state, loadedSongs: loadedSongs }

		case "LIST_SEARCH":
		return { ...state, search: action.search }

		case "SONG_CURRENTLYPLAYING":
		return { ...state, currentlyPlaying: action.currentlyPlaying }

		case "SONG_AUDIO_SET":
			if (state.audio!==null) state.audio.pause();
			return { ...state, audio: action.audio };
			
		case "SONG_AUDIO_TOGGLE":
			if (action.play) state.audio.play()
			else state.audio.pause() 
		return { ...state, audio: state.audio}

		case "LIST_SEARCH_TIMER_SET":
			return { ...state, searchTimer: action.searchTimer }

        default:
        return state;
    }
}

export default ListReducer;