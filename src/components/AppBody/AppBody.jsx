import React, { Component } from 'react';

/* Importing Components */
import Modal from '../Modal/Modal';
import Footer from '../Footer/Footer';

import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import TaskList from './components/TaskList/TaskList';
import ListOptions from './components/ListOptions/ListOptions';


class AppBody extends Component {
	constructor(props) {
		super(props);

		/* Define state */
		this.state = {
			toDoList		: 	[],
			taskName		:	'',
			modalOpened		:	false,
			checkedHidden 	: 	false
		};	
	}

	/**
	 * Getting random ID string for the task object
	 * @returns {String}
	 */
	getRandomId(){
		return '_' + Math.random().toString(36).substr(2, 9);
	}

	/**
	 * Get position in array by task ID
	 * @param {Object} taskObj 
	 * @returns {boolean or -1}
	 */
	getTaskPostion(taskId) {
		return this.state.toDoList.findIndex((task)=>{
			return taskId === task.idč
		})
	}

	/**
	 * Adding task to the todo list
	 * @param {Object} event 
	 */
	addTask(event) {
		event.preventDefault();
		let taskName = this.state.taskName;

		/*  Check if string is empty or containg just space caracters */
		if(taskName && taskName.trim() !== '') {
			/* Copy toDoList array becuase it should not be mutated */
			let newTaskList = this.state.toDoList.map((task)=>{ return task});

			/* Always tranform first letter to uppercase */
			taskName = taskName.charAt(0).toUpperCase() + taskName.slice(1);
			
			/* Adding new task to the array */
			newTaskList.push({ 
				id 		: 	this.getRandomId(), 
				name 	: 	taskName,
				checked : 	false,
				editing : 	false
			})

			this.setState({ taskName: '' });
			this.setState({ toDoList: newTaskList });
		}	
	}

	/**
	 * Trigger edit task mode
	 * @param {Object} event 
	 */
	editTask(taskIndex) {
		/* Copy toDoList array becuase it should not be mutated */
		let newTaskList = this.state.toDoList.map((task)=>{ return task});

		/* Chechking if there is task that is currently editing */
		let otherIsEditing = newTaskList.findIndex((task)=>{
			return task.editing;
		})

		/* First hide currently editing task view if exist */
		if(otherIsEditing !== -1) {
			newTaskList[otherIsEditing].editing = false;	
		}

		/* If task is not checked show edit mode view */
		if(!newTaskList[taskIndex].checked) {
			newTaskList[taskIndex].editing = true;
			this.setState({ toDoList: newTaskList });
		}
	}

	/**
	 * Removing task from the todo list
	 * @param {Object} task 
	 */
	removeTask(task) {
		/* Copy toDoList array becuase it should not be mutated */
		let newTaskList = this.state.toDoList.map((task)=>{ return task});

		/* Getting position of passed task in array */
		let itemPos = this.getTaskPostion(task.id);

		/* Removing task from the array */
		newTaskList.splice(itemPos, 1);

		this.setState({ toDoList: newTaskList });
	}

	/**
	 * Saving task edit
	 * @param {Object} task 
	 */
	saveEdit(taskIndex, newName) {
		if(newName) {
			/* Copy toDoList array becuase it should not be mutated */
			let newTaskList = this.state.toDoList.map((task)=>{ return task});

			/* Turning off task editing */
			newTaskList[taskIndex].editing = false;

			/* Always tranform first letter to uppercase */
			newTaskList[taskIndex].name = newName.charAt(0).toUpperCase() + newName.slice(1);
	
			this.setState({ toDoList: newTaskList });
		}
	}

	/**
	 * Deleting all tasks from the state
	 */
	deleteAll() {
		this.setState({ toDoList: [] });
	}

	/**
	 * Toggle hiding checked tasks state
	 */
	showHideChecked() {
		this.state.checkedHidden ? this.setState({checkedHidden:false}) : this.setState({checkedHidden:true});
	}

	/**
	 * Closing modal
	 */
	closeModal() {
		this.setState({ modalOpened: false });
	}

	/**
	 * Open modal
	 */
	openModal() {
		this.setState({ modalOpened: true });
	}

	/**
	 * Delete all tasks on modal confirmation
	 */
	confirmModal() {
		this.deleteAll();
		/* Closing modal */
		this.closeModal();
	}

	
	// Events Handlers
	/**
	 * Event handler for the check/uncheck task checkbox
	 * @param {Number} taskIndex 
	 */
	handleCheckedChange(taskIndex) {
		/* Copy toDoList array becuase it should not be mutated */
		let newTaskList = this.state.toDoList.map((task)=>{ return task});

		/* If task is in edit mode checking option is disabled  */
		if(!newTaskList[taskIndex].editing) {
			/* Toggle task checking/unchecking */
			newTaskList[taskIndex].checked ? newTaskList[taskIndex].checked = false : newTaskList[taskIndex].checked = true;

			this.setState({ toDoList: newTaskList });
		}
	}

	/**
	 * Event handler for the task name input field
	 * @param {Object} event 
	 */
	onTaskInput(event) {
		this.setState({taskName: event.target.value});
	}

	render() {
		return (
			<div className="section">
				<div className="columns is-centered">
					<div className="column is-half-desktop is-tree-quarter-tablet">
						<div className="card">
							<div className="task-list card-content">

								<h1 className="title is-5 has-text-centered is-marginless"><i className="is-size-6 fas fa-list"></i> Tasks List</h1>
								
								{/* Component containing input for adding new task*/}
								<AddTaskForm 
									onAddTask	=	{ (e) => { this.addTask(e) } } 
									onInput		=	{ (e) => { this.onTaskInput(e) } } 
									taskName	=	{ this.state.taskName } 			
								/>

								{/* Component that lists all tasks*/}
								<TaskList 
									onHandleCheckedChange 	= 	{ (taskIndex) => { this.handleCheckedChange(taskIndex) } }
									onRemoveTask			=	{ (task) => { this.removeTask(task) } }
									toDoList				=	{ this.state.toDoList } 
									checkedHidden			=	{ this.state.checkedHidden } 
									onEditTask				=	{ (taskIndex) => { this.editTask(taskIndex) } } 
									onSaveEdit 				=	{ (taskIndex, newName) => { this.saveEdit(taskIndex, newName) } }
								 />
							</div>
							
							{/* If there is tasks added show 'show/hide checked items' and 'delete all' buttons*/}
							{ this.state.toDoList.length > 0 &&			
								<ListOptions 
									checkedHidden		=	{ this.state.checkedHidden }
									onShowHideChecked 	= 	{ ()=>this.showHideChecked() }
									onOpenModal 		= 	{ ()=>this.openModal() }
								/>
							}
							<Footer />

						</div>
					</div>
				</div>	

				{/* Modal component for 'delete all items' confirmation*/}
				{ this.state.modalOpened &&
					<Modal 
						onCloseModal	=	{ ()=>this.closeModal() }
						onSubmitModal	=	{ ()=>this.confirmModal() }
					/>
				}		
			</div> 
		);
	}
}

export default AppBody;
