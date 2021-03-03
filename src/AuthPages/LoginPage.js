import React, { Component } from 'react'
import { signInUser } from '../api-utils.js';

export default class LoginPage extends Component {
    state = {
        email: '',
        password: ''

    };

    handleEmailChange = (e) => this.setState({ email: e.target.value });
    handlePasswordChange = (e) => this.setState({ password: e.target.value });
    handleSubmitChange = async e => {
        e.preventDefault();
        const user = await signInUser(this.state.email, this.state.password);
        this.props.handleUserChange(user);
        this.props.history.push('/todos');
    }
    render() {
        return (
            <div>
                <h3>Log In</h3>
                <form onSubmit={this.handleSubmitChange}>
                    <label>
                        Email:
                        <input value={this.state.email} onChange={this.handleEmailChange} />
                    </label>
                    <label>
                        Password:
                        <input value={this.state.password} onChange={this.handlePasswordChange} />
                    </label>
                    <button>Let's Go!</button>
                </form>

            </div>
        )
    }
}
