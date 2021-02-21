import { combineReducers } from "redux";
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    surveys: surveyReducer,
    form: formReducer
})