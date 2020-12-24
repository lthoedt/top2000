const initialLoginState = {
	status: "unloaded",
	songs: []
}

const RemindersReducer = ( state = initialLoginState, action ) => {
    // Note how all branches of the switch-statement always return
    // (a new version of) the state. Reducers must always return a (new) state.

    switch(action.type) {
        case "REMINDERS_STATUS_SET":
		return { ...state, status: action.status };

		case "REMINDERS_LOADED":
		return { ...state, songs: action.songs }

        default:
        return state;
    }
}

export default RemindersReducer;