export {
	GAME_STEP_TRANSLATE, default as deskReducer,
	getCard, getCardOpponent, nextStep, opponentStop, setGameWinner, startGame,
	viewResults, goToObservation
} from './desk.slice';
export type { TDeskSliceStore, TGameStatus, TWinnerGame } from './types';

