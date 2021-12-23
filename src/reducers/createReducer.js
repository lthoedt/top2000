const initialLoginState = {
	status: "unloaded",
	username: "",
	password: "",
	password2: "",
	email: "",
	message: {
		for: "",
		message: ""
	}
}

const CreateReducer = ( state = initialLoginState, action ) => {
    // Note how all branches of the switch-statement always return
    // (a new version of) the state. Reducers must always return a (new) state.

    switch(action.type) {
        case "CREATE_STATUS_SET":
		return { ...state, status: action.status }

		case "CREATE_INPUT_USERNAME":
		return { ...state, username: action.username}

		case "CREATE_INPUT_PASSWORD":
		return { ...state, password: action.password}

		case "CREATE_INPUT_PASSWORD2":
		return { ...state, password2: action.password2}
		
		case "CREATE_INPUT_EMAIL":
		return { ...state, email: action.email}

		case "CREATE_MESSAGE_SET":
		return { ...state, message: action.message }

		case "CREATE_SUCCESSFUL":
			window.location.href = '/reminders';
		return { ...state, username: "", email: "", password: "", password2: ""}

        default:
        return state;
    }
}

export default CreateReducer;