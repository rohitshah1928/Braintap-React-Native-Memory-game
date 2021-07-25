import { SET_GAME_LEVEL, SET_GAME_DATA } from '../constants/game.constant';

export const setGameLevel = (data) => ({
  type: SET_GAME_LEVEL,
  data: '7',
});

export const updateGameData = (data) => ({
  type: SET_GAME_DATA,
  data,
});