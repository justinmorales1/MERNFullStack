import axios from 'axios';
import { FETCH_USER } from "./actionTypes";


// export const fetchUser = () => {
//     return function(dispatch) {
//         axios.get('/api/current_user').then( res => {
//             dispatch({type: FETCH_USER, payload: res})
//         });
//     }
// };

//Async goes before the dispatch function because thats what is generating/returning the promise.
export const fetchUser = () => async (dispatch) => {
    //await gets put on the actual promise
        const res = await axios.get('/api/current_user');
            dispatch({type: FETCH_USER, payload: res.data});

};