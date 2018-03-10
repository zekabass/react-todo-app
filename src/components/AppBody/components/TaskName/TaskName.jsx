import React, { Component } from 'react';

class TaskName extends Component {
	render() {
		if(this.props.taskObj.editing) {	
			return (
				<div className="column editing-field has-text-left">
					<form onSubmit={ this.props.onSaveTask }>
						<input className="input is-primary edit-input" type="text" placeholder={this.props.taskObj.name} value={this.props.editingName}  onChange={ (e)=> { this.props.onTaskNameChange(e)} }/>
					</form>
				</div>
			)
		} else {	
			return (
				<div className="column has-text-left">
					<label htmlFor={this.props.taskObj.id} className={'task-name clickable '}>{this.props.taskObj.name}</label>	
				</div>
			);
		}
	}
}

export default TaskName;
