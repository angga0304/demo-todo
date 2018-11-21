import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import './App.css';

class App extends Component {
  state = {
    name: ""
  }

  handleKeyPress = (e) => {
    this.setState({name: e.target.value});
    if (e.charCode === 13) {
      let check = JSON.parse(localStorage.getItem('todoList'));
      let list = [];
      const todo = {
        name: e.target.value,
        checked: false
      }
      if (check) {
        check.push(todo);
        list = check;
      } else {
        list = [todo];
      }
      this.setState({name: ''});
      localStorage.setItem('todoList', JSON.stringify(list));
    }
  };

  handleClicked = (e) => {
    let check = JSON.parse(localStorage.getItem('todoList'));
    if (check[e.target.value].checked) {
      check[e.target.value].checked = false;
    } else {
      check[e.target.value].checked = true;
    }
    check[e.target.value].edit = false;
    localStorage.setItem('todoList', JSON.stringify(check));
  };

  deleteTodo = (e) => {
    let check = JSON.parse(localStorage.getItem('todoList'));
    check.splice(e.target.name,1);
    localStorage.setItem('todoList', JSON.stringify(check));
  }

  editName = (e) => {
    let check = JSON.parse(localStorage.getItem('todoList'));
  }

  render() {
    const lists = JSON.parse(localStorage.getItem('todoList'));
    const complete = 0;
    const rendered = lists.map((list, idx) => 
      <div  key={idx}><input name="finished" value={idx} type="checkbox" checked={list.checked} onChange={this.handleClicked}  /> <label>{list.name}</label> <input type="button" value='delete' onClick={this.deleteTodo} name={idx} /></div>
    );
    return (
      <div className="App">
        <div> Complete: {complete}  Start: {this.state.start} </div>
        <input name="inputTask" autocomplete="off" onKeyPress={this.handleKeyPress} />
        {this.state.name}
        {rendered}
      </div>
    );
  }
}

export default hot(module)(App);
