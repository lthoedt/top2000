import React from 'react';

import { useDispatch } from 'react-redux';

import { Page, LoginScreenTitle, List, ListInput, ListButton } from 'framework7-react';

export default function Create() {

	const dispatch = useDispatch();

	return (
		<Page noToolbar noNavbar noSwipeback loginScreen>
			<LoginScreenTitle>Account aanmaken</LoginScreenTitle>
			<List form>
				<ListInput
					label="Email"
					type="text"
					placeholder="Jouw email"
				/>
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
				<ListButton>Creeër</ListButton>
			</List>
		</Page>
	);
}