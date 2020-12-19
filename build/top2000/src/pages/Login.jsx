import React from 'react';

import { useDispatch } from 'react-redux';

import { Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter } from 'framework7-react';

export default function Create() {

	const dispatch = useDispatch();

	return (
		<Page noToolbar noNavbar noSwipeback loginScreen>
			<LoginScreenTitle>Inloggen</LoginScreenTitle>
			<List form>
				<ListInput
					label="Gebruiksnaam"
					type="text"
					placeholder="Jouw gebruikersnaam"
				/>
				<ListInput
					label="Wachtwoord"
					type="password"
					placeholder="Jouw wachtwoord"
				/>
			</List>
			<List>
				<ListButton>Log In</ListButton>
				<BlockFooter>Log in om reminders te kunnen instellen!</BlockFooter>
			</List>
		</Page>
	);
}