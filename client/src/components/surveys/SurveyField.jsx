import React from 'react';

//Wiring up a custom field
//The meta props has been nested for deconsructed the object
export default ({input, label, meta: {error, touched}}) => {

    return (
        <div>
            {/*Save time by grabbing all the input props with using the spread operator. If you want to see the props then console log props*/}
            <label> { label } </label>
            <input style={{marginBottom: '5px'}} {...input}/>
            {/*Check if field has been touched and if there is an error in the meta prop*/}
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    )
};


