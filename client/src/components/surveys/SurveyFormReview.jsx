import React from 'react';
import { connect } from "react-redux";
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../../actions'

const  SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

    const fieldList = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label> {label} </label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });

    return (
        <div>

            <h5>
                Please confirm your entries.
            </h5>

            {fieldList}

            {/*Call back function fo oncancel that gets passed down from survey new.*/}
            <button className="yellow darken-3 btn-flat" onClick={onCancel}>
                Back
            </button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
};

//This object that is returned gets passed as a prop back to the SurveyFormReview
// so we can deconstruct formValues at the top of the function.
function mapStateToProps(state) {
    console.log(state)
    return {
        formValues: state.form.surveyForm.values
    }
}

//Using with router so that this component can interact with the router.
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));