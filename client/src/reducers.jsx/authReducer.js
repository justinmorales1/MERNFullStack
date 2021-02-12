import {FETCH_USER} from "../actions/actionTypes";


export default (state = null, action) => {
    console.log(action);
    switch(action.type) {
        case FETCH_USER:
            //If the action.payload is an empty string then we are going to return false.
            return action.payload || false;
        default:
            return state;
    }
}