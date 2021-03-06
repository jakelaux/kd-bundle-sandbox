import { store } from '../store';

export const types = {
  SYNC_APP_STATE: 'SYNC_APP_STATE',
};

export const reducer = (state = {}, action) => {
  let newState = { ...state };
  if (action.type === types.SYNC_APP_STATE) {
    newState[action.payload.key] = action.payload.value;
  }
  // Conditional statement defining when the package has synced all of the
  // required state from the app package and is ready
  if (
    newState.space &&
    newState.kapp &&
    (newState.profile || newState.authenticated === false) &&
    newState.layoutSize
  ) {
    newState.ready = true;
  } else {
    newState.ready = false;
  }
  return newState;
};

export const syncAppState = ([key, value]) => {
  store.dispatch({ type: types.SYNC_APP_STATE, payload: { key, value } });
};
