import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends React.Component {


    renderContent () {
        console.log(this.props.auth)
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google"> Login With Google </a>
                    </li>
                )
            default:
                return <li><a href="/api/logout">Logout</a></li>
        }
    }


    render() {

        console.log(this.props.auth)
        return (
                <nav>
                    <div className="nav-wrapper">
                        <Link to={this.props.auth ? '/surveys' : '/'}
                              className="left brand-logo"> Survey Me
                        </Link>
                        <ul id="nav-mobile" className="right">
                            <li>
                                {this.renderContent()}
                            </li>
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