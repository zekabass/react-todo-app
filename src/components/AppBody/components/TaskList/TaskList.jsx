import React, { Component } from 'react';

import TaskName from '../TaskName/TaskName';
import EditButton from '../EditButton/EditButton';

class TaskList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editingName	: 	'',
		};
	}

	/**
	 * On input change, change editing text
	 * @param {Object} event 
	 * @param {Object} task 
	 */
	taskNamechange(event, task) {
		this.setState({ editingName : event.target.value });
	}

	/**
	 * On editing save action call fun from parent that saves it to the list
	 * @param {Object} event 
	 * @param {Object} taskIndex 
	 */
	taskSave(event, taskIndex) {
		if(event) {
			event.preventDefault();
		}
		this.props.onSaveEdit(taskIndex, this.state.editingName);
	}

	/**
	 * Function that starts editing mode or saves edit
	 * @param {Number} index 
	 * @param {Object} task 
	 */
	editingAndSaving(index, task) {
		if(!task.editing) {
			/* Edit icon clicked - start edit mode */
			this.props.onEditTask(index); 
			this.setState({ editingName : task.name });
		} else {
			/* Save icon clicked - save it to the list */
			this.taskSave(false, index);
		}
	}

	render() {
		/* Generate list of added items */
		const listItems = this.props.toDoList.map((task, index) => {
			return this.props.checkedHidden && task.checked ?
				''
			:
				<li key={task.id} className={'card task ' + (task.checked ? 'checked' : '')}>	
					<div className="columns is-mobile">
						<div className="column is-narrow has-text-right ">
							<input id={task.id} className="clickable" type="checkbox" 
							checked={ task.checked } 
							onChange={ ()=>this.props.onHandleCheckedChange(index) }/>
						</div>

						{/* Component that shows task name or editing input field */}
						<TaskName 
							onTaskNameChange	=	{ (e)=>{ this.taskNamechange(e, task) } } 
							onSaveTask			= 	{ (e)=>{ this.taskSave(e, index) } } 
							taskObj				=	{ task } 
							editingName 		= 	{ this.state.editingName }
						/>	
					
						<div className={'column is-narrow has-text-right ' + (task.checked ? '' : 'clickable')}  
							 onClick={ ()=> { this.editingAndSaving(index, task)} }>

							{/* Component that shows edit icon or save edit icon */}
							<EditButton editing={task.editing}/>			
						</div>

						<div className="column is-narrow has-text-right clickable" onClick={ ()=>this.props.onRemoveTask(task) } >
							<i className="fas fa-trash-alt "></i>
						</div>	
					</div>
				</li>
		});

		return (
			<div className="to-do-list">						
				<ul>
					{listItems}
				</ul>							
			</div>
		);
	}
}

export default TaskList;
