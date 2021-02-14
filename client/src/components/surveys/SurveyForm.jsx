import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from "./SurveyField";
import validateEmails from '../../utilities/validateEmails'
import formFields from './formFields';



class  SurveyForm extends React.Component {

    // renderFields() {
    //     return (
    //         <div>
    //             <Field type="text" name="title" component={SurveyField} label="Survey Title" />
    //             <Field type="text" name="subject" component={SurveyField} label="Subject Line" />
    //             <Field type="text" name="body" component={SurveyField} label="Email Body" />
    //             <Field type="text" name="emails" component={SurveyField} label="Recipient List" />
    //
    //         </div>
    //     )
    // }

    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        })
    }


    render() {
        return (
            <div>
                {/*Callback to set form review state to true*/}
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    { this.renderFields() }
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

//Validate has name of each field and their values
function validate(values) {

    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    // if( !values.title ) {
    //     //     errors.title = "You must provide a title";
    //     // }
    //     //
    //     // if( !values.subject ) {
    //     //     errors.subject = "You must provide a subject";
    //     // }
    //     //
    //     // if( !values.body ) {
    //     //     errors.body = "You must provide a body";
    //     // }

    //This for each replaces the if statements above.
    _.each(formFields, ({name}) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });


    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    //Keep the values when you go to SurveyFromReview
    destroyOnUnmount: false
})(SurveyForm);