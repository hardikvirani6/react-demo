import homeReducer from "./home";
import { combineReducers } from 'redux';

const configureStore = () =>
    combineReducers({
        home: homeReducer,
});

export default configureStore;