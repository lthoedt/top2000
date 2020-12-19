import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Page, LoginScreenTitle, List, ListInput, ListButton } from 'framework7-react';

import { createAction } from '../actions/createActions';

export default function Create() {

	const dispatch = useDispatch();

	const state = useSelector(state => state.create);

	return (
		<Page noToolbar noNavbar noSwipeback loginScreen>
			<LoginScreenTitle>Account aanmaken</LoginScreenTitle>
			<List form>
				<ListInput
					label="Email"
					type="text"
					placeholder="Jouw email"
					value={state.email}
					onInput={(e) => dispatch({ type: "CREATE_INPUT_EMAIL", email: e.target.value })}
					errorMessage={(state.message.for==="email") ? state.message.message : ""}
					errorMessageForce={(state.message.for!=="")}
				/>
				<ListInput
					label="Gebruiksnaam"
					type="text"
					placeholder="Jouw gebruikersnaam"
					value={state.username}
					onInput={(e) => dispatch({ type: "CREATE_INPUT_USERNAME", username: e.target.value })}
					errorMessage={(state.message.for==="username") ? state.message.message : ""}
					errorMessageForce={(state.message.for!=="")}
				/>
				<ListInput
					label="Wachtwoord"
					type="password"
					placeholder="Jouw wachtwoord"
					value={state.password}
					onInput={(e) => dispatch({ type: "CREATE_INPUT_PASSWORD", password: e.target.value })}
					errorMessage={(state.message.for==="password") ? state.message.message : ""}
					errorMessageForce={(state.message.for!=="")}
				/>
				<ListInput
					label="Wachtwoord opnieuw"
					type="password"
					placeholder="Herhaal jouw wachtwoord"
					value={state.password2}
					onInput={(e) => dispatch({ type: "CREATE_INPUT_PASSWORD2", password2: e.target.value })}
					errorMessage={(state.message.for==="password") ? state.message.message : ""}
					errorMessageForce={(state.message.for!=="")}
				/>
			</List>
			<List>
				<ListButton onClick={() => dispatch(createAction())}>Creeër</ListButton>
			</List>
		</Page>
	);
}