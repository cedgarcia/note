import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userLoginReducer } from './reducers/userReducers';

import { noteListReducer } from './reducers/notesReducer';

const reducer = combineReducers({
  //THIS WILL COUNTAIN OUR REDUCERs
  userLogin: userLoginReducer,
  noteList: noteListReducer,
});
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
