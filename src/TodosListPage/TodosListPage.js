import React, { Component } from 'react'
import { getTodos, setTodos, completeTodos } from '../api-utils.js';

export default class TodosListPage extends Component {
    state = {
        todos: [],
        todo: ''
    }

    componentDidMount = async () => {
        await this.fetchTodos();
    }
    fetchTodos = async () => {
        const todos = await getTodos(this.props.user.token);
        this.setState({ todos });
    }
    handleChange = e => this.setState({ todo: e.target.value })
    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state.todo);
        await setTodos(this.state.todo, this.props.user.token);
        await this.fetchTodos();
        this.setState({ todo: '' })
    }
    handleTodoComplete = async (todoId) => {
        await completeTodos(todoId, this.props.user.token);
        this.fetchTodos();
    }
    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.todo} onChange={this.handleChange} />
                    <button>Add a 'To Do' to your list </button>
                </form>
                {this.state.todos.map(todo =>
                    <p key={`${todo.todo}-${todo.id}`}
                        onClick={() => this.handleTodoComplete(todo.id)}
                        className={`
                        todo ${todo.completed
                                ? 'completed'
                                : ''}`
                        } >
                        {todo.todo}
                    </p>)}

            </div>
        )
    }
}
