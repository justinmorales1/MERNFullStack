import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from "./actionTypes";


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


export const handleToken = (token) => async dispatch => {

    const res = await axios.post('/api/stripe', token);

    dispatch({
        type: FETCH_USER,
        payload: res.data
    })

};


export const submitSurvey = (values, history) => async (dispatch) => {
    console.log("Submit surveys", values)
    const res = await axios.post('/api/surveys',values);

    history.push('/surveys');

    dispatch({
        type: FETCH_USER,
        payload: res.data
    });

};

export const fetchSurveys = () => async (dispatch) => {
    const res = await axios.get('/api/surveys');

    dispatch({type: FETCH_SURVEYS, payload: res.data})


};