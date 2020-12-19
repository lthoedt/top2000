const initialLoginState = {
	status: "unloaded",
	song: {
        "id": null,
        "url": "",
        "title": "",
        "artist": "",
        "image": ""
    }
}

const PlayingReducer = ( state = initialLoginState, action ) => {
    // Note how all branches of the switch-statement always return
    // (a new version of) the state. Reducers must always return a (new) state.

    switch(action.type) {
        case "PLAYING_STATUS_SET":
		return { ...state, status: action.status };
		
		case "PLAYING_LOADED":
		return { ...state, song: action.song};

        default:
        return state;
    }
}

export default PlayingReducer;