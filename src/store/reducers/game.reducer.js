import constants from '../constants/game.constant';

const initialState = {
  currentLevel: 7,
  levels: {

    7: {
      numberOfCards: 16,
      numberOfColumns: 4,
      isCompleted: false,
      data: ['D', 'C', 'F', 'A', 'H', 'F', 'B', 'G', 'H', 'C', 'A', 'G', 'B', 'E', 'D', 'E']
    }
  },
};

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_GAME_LEVEL:
      return {
        ...state,
        currentLevel: '7'
      }
    case constants.SET_GAME_DATA:
      return {
        ...state,
        levels: action.data
      }
    default:
      return state;
  }
}

export default gameReducer;