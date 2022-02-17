import { combineReducers } from 'redux';
import search from 'redux/reducers/searchReducer';

const rootReducer = combineReducers({
  search,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>