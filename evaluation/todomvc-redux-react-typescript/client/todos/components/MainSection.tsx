import * as React from 'react'

import { Todo, TodoId } from '../model'
import { TodoItem } from './TodoItem'
import { Footer } from './Footer'
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../constants/TodoFilters'

const todoFilterFunctions = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

interface MainSectionProps {
  todos: Array<Todo>
  clearCompleted: () => void
  completeAll: () => void
  completeTodo: (todoId: TodoId) => void
  deleteTodo: (todoId: TodoId) => void
  editTodo: (todoId: TodoId, newText: string) => void
}

interface MainSectionState {
  filter: string
}

export class MainSection extends React.Component<MainSectionProps, MainSectionState> {
  constructor(props, context) {
    super(props, context)
    this.state = { filter: SHOW_ALL }
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed)
    if (atLeastOneCompleted) {
      this.props.clearCompleted()
    }
  }

  handleShow(filter) {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const { todos, completeAll } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={() => completeAll()}
        />
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted.bind(this)}
          onShow={this.handleShow.bind(this)}
        />
      )
    }
  }

  render() {
    const { todos, completeTodo, deleteTodo, editTodo } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(todoFilterFunctions[filter])
    const completedCount = todos.reduce((count: number, todo): number =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={editTodo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}