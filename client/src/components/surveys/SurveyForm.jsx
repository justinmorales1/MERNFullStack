import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from "./SurveyField";
import validateEmails from '../../utilities/validateEmails'


const FIELDS = [
    { label: 'Survey Title', name: 'title'},
    { label: 'Subject Line', name: 'subject'},
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
];

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
        return _.map(FIELDS, ({label, name}) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit((values)=> {console.log(this.props, values)})}>
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

    errors.emails = validateEmails(values.emails || '');

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
    _.each(FIELDS, ({name}) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });


    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);