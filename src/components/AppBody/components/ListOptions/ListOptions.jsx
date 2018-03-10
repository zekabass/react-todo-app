import React, { Component } from 'react';

class ListOptions extends Component {
	render() {
		return (
			<div className="columns is-mobile has-text-centered">
				<div className="column">
					<h1 className="title is-7 clickable" onClick={this.props.onShowHideChecked}>
						{/* If user hides checked tasks, change text */}
						{this.props.checkedHidden ?
							'Show Checked'
							:
							'Hide Checked'
						}
					</h1>								
				</div>
				<div className="column">
					<h1 className="title is-7 clickable" onClick={ this.props.onOpenModal }>Delete All</h1>				
				</div>
			</div>
		);
	}
}

export default ListOptions;
