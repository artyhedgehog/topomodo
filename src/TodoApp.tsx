import * as React from 'react';
import { ChangeEvent } from "react";
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS, ENTER_KEY } from "./constants";
import TodoFooter from "./TodoFooter";
import TodoItem from "./TodoItem";

export default class TodoApp extends React.Component<IAppProps, IAppState> {
  public state: IAppState;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      editing: null,
      nowShowing: ALL_TODOS,
      values: {
        newTodo: '',
      },
    };
  }

  public handleNewTodoKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    if (this.state.values.newTodo) {
      this.props.model.addTodo(this.state.values.newTodo);
      this.setState({ values: { newTodo: '' } });
    }
  };

  public toggleAll(event: React.FormEvent) {
    const target: any = event.target;
    const checked = target.checked;
    this.props.model.toggleAll(checked);
  }

  public toggle(todoToToggle: ITodo) {
    this.props.model.toggle(todoToToggle);
  }

  public destroy(todo: ITodo) {
    this.props.model.destroy(todo);
  }

  public edit(todo: ITodo) {
    this.setState({editing: todo.id});
  }

  public save(todoToSave: ITodo, text: string) {
    this.props.model.save(todoToSave, text);
    this.setState({editing: null});
  }

  public cancel() {
    this.setState({editing: null});
  }

  public clearCompleted() {
    this.props.model.clearCompleted();
  }

  public render() {
    let footer;
    let main;
    const todos = this.props.model.todos;

    const shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

    const todoItems = shownTodos.map((todo) => {
      return (
          <TodoItem
              key={ todo.id }
              todo={ todo }
              onToggle={ this.toggle.bind(this, todo) }
              onDestroy={ this.destroy.bind(this, todo) }
              onEdit={ this.edit.bind(this, todo) }
              editing={ this.state.editing === todo.id }
              onSave={ this.save.bind(this, todo) }
              onCancel={ this.handleCancel }
          />
      );
    });

    // Note: It's usually better to use immutable data structures since they're
    // easier to reason about and React works very well with them. That's why
    // we use map(), filter() and reduce() everywhere instead of mutating the
    // array or todo items themselves.
    const activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
          <TodoFooter
              count={ activeTodoCount }
              completedCount={ completedCount }
              nowShowing={ this.state.nowShowing }
              onClearCompleted={ this.handleClearCompleted }
          />;
    }

    if (todos.length) {
      main = (
          <section className="main">
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={ this.handleToggleAllChange }
                checked={ activeTodoCount === 0 }
            />
            <label
                htmlFor="toggle-all"
            >
              Mark all as complete
            </label>
            <ul className="todo-list">
              { todoItems }
            </ul>
          </section>
      );
    }

    return (
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              value={ this.state.values.newTodo}
              className="new-todo"
              placeholder="What needs to be done?"
              onKeyDown={ this.handleNewTodoKeyDown }
              autoFocus={ true }
              onChange={ this.handleNewTodoChange }
            />
          </header>
          { main }
          { footer }
        </div>
    );
  }
  private handleCancel = () => this.cancel();
  private handleToggleAllChange = (e: any) => this.toggleAll(e);

  private handleNewTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    this.setState({ values: { newTodo: value } });
  };

  private handleClearCompleted = (): any => this.clearCompleted();
}
