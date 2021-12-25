const initialLoginState = {
	status: "unloaded",
	username: "",
	password: "",
	message: {
		for: "",
		message: ""
	}
}

const LoginReducer = ( state = initialLoginState, action ) => {
    // Note how all branches of the switch-statement always return
    // (a new version of) the state. Reducers must always return a (new) state.

    switch(action.type) {
        case "LOGIN_STATUS_SET":
		return { ...state, status: action.status }

		case "LOGIN_INPUT_USERNAME":
		return { ...state, username: action.username}

		case "LOGIN_INPUT_PASSWORD":
		return { ...state, password: action.password}

		case "LOGIN_MESSAGE_SET":
		return { ...state, message: action.message }

		case "LOGIN_SUCCESSFUL":
			sessionStorage.username = action.data.username;
			sessionStorage.reminders = action.data.reminders;

		return { ...state, username: "", password: ""}

        default:
        return state;
    }
}

export default LoginReducer;