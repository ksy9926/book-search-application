import { createStore } from 'redux';
import rootReducers from 'redux/reducers';

const store = createStore(rootReducers);

export { store };