import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends React.Component {

    // Fake Credit card number for stripe 4242 4242 4242 4242 - Its fake people dont freak out and try to buy stuff with it.
    renderContent () {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google"> Login With Google </a>
                    </li>
                );
            default:
                return (
                    [
                        <li key="1"><Payments /></li>,
                        <li key="2" style={{ margin: "0 10px"}}> Credits: { this.props.auth.credits } </li>,
                        <li key="3"><a href="/api/logout">Logout</a></li>
                    ]
                )
        }
    }

    render() {

        return (
                <nav>
                    <div className="nav-wrapper">
                        <Link to={this.props.auth ? '/surveys' : '/'}
                              className="left brand-logo"> Survey Me
                        </Link>
                        <ul id="nav-mobile" className="right">
                                {this.renderContent()}
                        </ul>
                    </div>
                </nav>
        )
    }
}

const mapStateToProps = ({auth}) => {
    return {
        auth
    }
}


export default connect(mapStateToProps)(Header);