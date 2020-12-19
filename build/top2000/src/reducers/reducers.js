import {combineReducers} from 'redux'

import ListReducer from './listReducer';
import PlayingReducer from './playingReducer';

export const mainReducer = combineReducers({
	list: ListReducer,
	playing: PlayingReducer
})
