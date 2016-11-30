import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default(state = initialState.courses, action) =>
{
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
      return [
        // grab our state, then add our new course in
        ...state,
        Object.assign({}, action.course)
      ];

    case types.UPDATE_COURSE_SUCCESS:
      return [
        // filter out THIS course from our copy of the state, then add our updated course in
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
};
