import React, { Component } from 'react';

import Logo from '../../logo.png';

class Header extends Component {
	render() {
		return (
			<header className="has-text-centered">
				<img className="logo-icon" src={Logo} alt=""/>
				<h1 className="title is-size-3-desktop is-size-5-mobile">TO DO APP</h1>
			</header>
		);
	}
}

export default Header;
