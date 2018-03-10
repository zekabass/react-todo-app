import React, { Component } from 'react';

class Modal extends Component {
	render() {
		return (
			<div className="modal is-active">
				<div className="modal-background"></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title is-size-5">Confirmation</p>
					</header>
					<section className="modal-card-body">
						Are You shure you want to delete all tasks?
					</section>
					<footer className="modal-card-foot">
						<button className="button is-primary" onClick={this.props.onSubmitModal}>Delete All</button>
						<button className="button " onClick={this.props.onCloseModal}>Cancel</button>
					</footer>
				</div>
			</div>
		);
	}
}

export default Modal;
