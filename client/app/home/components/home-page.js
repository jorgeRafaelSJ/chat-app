import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addNewMessage } from '../action-creators.js'

class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = (e) => {
			e.preventDefault();
			console.log(this.chatInput.value);
			this.socket.emit('message', { body: this.chatInput.value });
			this.chatInput.value = '';
		};

	}

	componentWillMount() {
		this.socket = io.connect('http://localhost:3000');

		this.socket.on('connect', () => {

		});

		this.socket.on('message', (messageData) => {
			console.log('messageData', messageData);
			this.props.addNewMessage(messageData);
		});
	}

	render() {

		let messages = this.props.home.messages.map((message) => {
			return <div>{message.body}</div>
		});

		return(
			<div className="home-page">
				<div className="message-display"><div className="message-feed">{messages}</div></div>
				<form name="message-entry" onSubmit={this.handleSubmit.bind(this)}> 
					<input type="text"
					id = "chat-input"
					name = "chat-input"
					ref ={(input) => this.chatInput = input}/>

					<button type="submit">SEND</button>
				</form> 
			</div>
		);
	}
}

// CONNECT TO REDUX AND EXPORT COMPONENT 
function mapStateToProps(state) {
	return { home: state.home }
}

function mapDispatchToProps(dispatch) {
	return { 
		addNewMessage	: bindActionCreators(addNewMessage, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)