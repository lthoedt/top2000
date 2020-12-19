import React from 'react';

import { useDispatch } from 'react-redux';

import { Page, LoginScreenTitle, List, ListInput, BlockFooter, Link, ListItem } from 'framework7-react';

export default function Create() {

	const dispatch = useDispatch();

	return (
		<Page noToolbar noNavbar noSwipeback loginScreen>
			<LoginScreenTitle>Account aanmaken</LoginScreenTitle>
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
				<ListItem>
					<Link>Log In</Link>
					|
					<Link href="/create">Of maak een account aan.</Link>
				</ListItem>
				<BlockFooter>Log in om reminders te kunnen instellen!</BlockFooter>
			</List>
		</Page>
	);
}