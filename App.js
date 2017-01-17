import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from './actions/actions';

import AddTodo from './components/AddTodo.js';
import TodoList from './components/TodoList.js';
import MyComponent from './components/MyHOC.js';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class App extends Component {

   constructor(props) {
      super(props);
      
      this.state = {
         items: ['Item 1...', 'Item 2...', 'Item 3...', 'Item 4...']
      }

      this.handleAdd = this.handleAdd.bind(this);
   };

   handleAdd() {
      var newItems = this.state.items.concat([prompt('Create New Item')]);
      this.setState({items: newItems});
   }

   handleRemove(i) {
      var newItems = this.state.items.slice();
      newItems.splice(i, 1);
      this.setState({items: newItems});
   }

   render() {
      const { dispatch, visibleTodos } = this.props;
      let items = this.state.items.map(function(item, i) {
         return (
            <div key = {item} onClick = {this.handleRemove.bind(this, i)}>
               {item}
            </div>
         );
      }.bind(this));
      
      return (
         <div>
            <MyComponent data={'from app component'} />
            <AddTodo onAddClick = {text => dispatch(addTodo(text))} />
            <TodoList todos = {visibleTodos}/>
            <div>
               <button onClick = {this.handleAdd}>Add Item</button>
               <ReactCSSTransitionGroup transitionName = "example" 
                  transitionEnterTimeout = {500} transitionLeaveTimeout = {500}>
                  {items}
               </ReactCSSTransitionGroup>
            </div>
         </div>
      )
   }
}

function select(state) {
   return {
      visibleTodos: state.todos
   }
}

export default connect(select)(App);