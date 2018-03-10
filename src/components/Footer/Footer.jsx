import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="card-footer">
				<p className="card-footer-item">
					<span>
						View on 
						<a rel="noopener noreferrer" href="https://github.com/zekabass/react-todo-app" target="_blank"> Git Hub </a> 
						<i className="fab fa-github"></i>
					</span>
				</p>
			</footer>
		);
	}
}

export default Footer;
