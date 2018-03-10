import React, { Component } from 'react';

// Main sass
import './App.scss';

// Components
import Header from './components/Header/Header';
import AppBody from './components/AppBody/AppBody';

class App extends Component {
	render() {
		return (
		<div className="section">
			<div className="container">
				<Header/>
				<AppBody/>
			</div>
		</div>
		);
	}
}

export default App;
