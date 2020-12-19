import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Page, LoginScreenTitle, List, ListInput, BlockFooter, Link, ListItem } from 'framework7-react';

import { loginAction } from '../actions/loginActions';
import PreloaderModal from '../components/Preloader';

export default function Create() {

	const dispatch = useDispatch();

	const state = useSelector(state => state.login);

	return (
		<Page noToolbar noNavbar noSwipeback loginScreen>
			{
				(state.status == "loading")
					? <PreloaderModal />
					:
					<div>
						<LoginScreenTitle>Account aanmaken</LoginScreenTitle>
						<List form>
							<ListInput
								label="Gebruiksnaam"
								type="text"
								placeholder="Jouw gebruikersnaam"
								value={state.username}
								onInput={(e) => dispatch({ type: "LOGIN_INPUT_USERNAME", username: e.target.value })}
								errorMessage={(state.message.for === "username") ? state.message.message : ""}
								errorMessageForce={(state.message.for !== "")}
							/>
							<ListInput
								label="Wachtwoord"
								type="password"
								placeholder="Jouw wachtwoord"
								value={state.password}
								onInput={(e) => dispatch({ type: "LOGIN_INPUT_PASSWORD", password: e.target.value })}
								errorMessage={(state.message.for === "password") ? state.message.message : ""}
								errorMessageForce={(state.message.for !== "")}
							/>
						</List>
						<List>
							<ListItem>
								<Link onClick={() => dispatch(loginAction())} type="submit">Log In</Link>
							|
							<Link href="/create">Of maak een account aan.</Link>
							</ListItem>
							<BlockFooter>Log in om reminders te kunnen instellen!</BlockFooter>
						</List>
					</div>
			}
		</Page>
	);
}