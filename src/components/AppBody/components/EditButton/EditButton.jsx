import React, { Component } from 'react';

class EditButton extends Component {
	render() {
		return (
			<span>
				{/* Change icon if user enters edit mode */}
				{!this.props.editing &&
					<span><i className="fas fa-pencil-alt"></i></span>
				}
				{this.props.editing &&
					<span><i className="fas fa-check"></i></span>
				}
			</span>
			
		)
	}
}

export default EditButton;
