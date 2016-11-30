import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default(state = initialState.authors, action) =>
{
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    case types.CREATE_AUTHOR_SUCCESS:
      return [
        // grab our state, then add our new author in
        ...state,
        Object.assign({}, action.author)
      ];

    case types.UPDATE_AUTHOR_SUCCESS:
      return [
        // filter out THIS author from our copy of the state, then add our updated author in
        ...state.filter(author => author.id !== action.author.id),
        Object.assign({}, action.author)
      ];
    default:
      return state;
  }
};
