import { Actions } from "framework7-react";

const initialLoginState = {
	status: "unloaded",
	loadedSongs: 10,
	songs: []
}

const ListReducer = ( state = initialLoginState, action ) => {
    // Note how all branches of the switch-statement always return
    // (a new version of) the state. Reducers must always return a (new) state.

    switch(action.type) {
        case "LIST_STATUS_SET":
		return { ...state, status: action.status };
		
		case "LIST_LOADED":
		return { ...state, songs: action.songs};

		case "LIST_LOAD_MORE":
			const loadedSongs = state.loadedSongs + 10;
		return { ...state, loadedSongs: loadedSongs }

        default:
        return state;
    }
}

export default ListReducer;