import React from 'react';

class Header extends React.Component {
    render() {
        return (
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="left brand-logo"> Survey Me </a>
                        <ul id="nav-mobile" className="right">
                            <li><a href="sass.html">Login With Google</a></li>
                        </ul>
                    </div>
                </nav>
        )
    }
}


export default Header;