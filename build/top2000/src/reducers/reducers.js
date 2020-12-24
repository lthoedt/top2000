import {combineReducers} from 'redux'

import ListReducer from './listReducer';
import PlayingReducer from './playingReducer';
import CreateReducer from './createReducer';
import LoginReducer from './loginReducer';
import RemindersReducer from './remindersReducer';

export const mainReducer = combineReducers({
	list: ListReducer,
	playing: PlayingReducer,
	create: CreateReducer,
	login: LoginReducer,
	reminders: RemindersReducer
})
