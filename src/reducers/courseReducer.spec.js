import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('CourseReducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ];

    const newCourse = {
      title: 'C'
    };

    const action = actions.createCourseSuccess(newCourse);

    const newState = courseReducer(initialState, action);


    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should update a course when passed UPDATE_COURSE_SUCCESS', () => {
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'},
      {id: 'C', title: 'C'}
    ];

    const updatedCourse = {
      id: 'B', title: 'New Title'
    };

    const action = actions.updateCourseSuccess(updatedCourse);

    const newState = courseReducer(initialState, action);


    expect(newState.length).toEqual(3);
    expect(newState.find(el => el.id==='A').title).toEqual('A');
    expect(newState.find(el => el.id==='B').title).toEqual('New Title');
  });
});
