import React, { Component } from 'react';

class AddTaskForm extends Component {
	render() {
		return (
			<form className="section" onSubmit={ this.props.onAddTask }>
				<div className="columns">
				
					<div className="column">
						<div className="field">
							<div className="control">
								<input className="input is-primary" type="text" placeholder="Add new task" value={this.props.taskName}  onChange={ this.props.onInput } />
							</div>
						</div>
					</div>

					<div className="column is-4">
						<button type="submit" className="button is-fullwidth is-primary" >Add Task</button>
					</div>
				
				</div>
			</form>
		);
	}
}

export default AddTaskForm;
