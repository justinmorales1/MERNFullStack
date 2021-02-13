import React from 'react';
import { connect } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';


class Payments extends React.Component {

    render() {
        return (
            <div>
                <StripeCheckout
                    name="SurveyMe"
                    description="Spend $5 to get 5 email credits"
                    amount={500}
                    //Token is expecting to receive a callback function that is called after receiving a token representing a charge.
                    token={token => this.props.handleToken(token)}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                >
                    <button className="btn"> Add Credits </button>
                </StripeCheckout>
            </div>
        )
    }
}

export default connect(null, actions)(Payments);