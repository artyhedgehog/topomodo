import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import TodoApp from './TodoApp';
import TodoModel from './TodoModel';

class App extends React.Component {
  private model = new TodoModel('react-todos');

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <TodoApp model={ this.model }/>
      </div>
    );
  }
}

export default App;
