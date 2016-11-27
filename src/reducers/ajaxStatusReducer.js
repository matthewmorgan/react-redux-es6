import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type){
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action){
  return action.type
  === types.BEGIN_AJAX_CALL
    ? state + 1
    : actionTypeEndsInSuccess(action.type) || action.type === types.AJAX_CALL_ERROR
      ? state -1
      : state;
}
