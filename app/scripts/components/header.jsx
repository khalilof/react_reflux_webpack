import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

    constructor(props, context) {
        super(props);
    }

    render() {
        return (
            <header className="clearfix">
                assignment scalable

                <nav className="clearfix">
                    <div className="nav-item">
                        <Link to="home">Repo List</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="info">Comments About ES6 usagae</Link>
                    </div>
                </nav>
            </header>
        );
    }

}

Header.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Header;