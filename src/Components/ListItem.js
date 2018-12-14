import React, { Component } from 'react';
import './ListItem.css';

class ListItem extends Component {
  handleRemoveTodo = () => {
    this.props.onRemoveTodo(this.props.todo);
  }
  render() {
    return (
      <div>
        <h3 style={{backgroundColor: `#${this.props.color}`}} className='listItem' onClick={this.handleRemoveTodo}>{this.props.todo}</h3>
      </div>
    );
  }
}

export default ListItem;
