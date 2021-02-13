import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends React.Component {

    //Credit card number 4242 4242 4242 4242
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
                        <li key="2"><a href="/api/logout">Logout</a></li>
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