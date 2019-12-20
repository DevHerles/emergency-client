const initialState = { palabra: '' };

export default (state = initialState, action) => {
  if (action.type === 'UPDATE_WORD') {
    return {
      ...state,
      palabra: action.payload
    }
  }
  return state;
};

export const selectActiveWord = state => state.palabraReducer.palabra;
