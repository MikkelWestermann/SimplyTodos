import React, { Component } from 'react';

const divStyle = {
  color: '#1f1f1f',
  backgroundColor: '#38b3be',
  width: '100vw',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2.5em'
};

class ListItem extends Component {
  handleRemoveTodo = () => {
    this.props.onRemoveTodo(this.props.index);
  }
  render() {
    return (
      <div>
        <h3 style={divStyle} onClick={this.handleRemoveTodo}>{this.props.todo}</h3>
      </div>
    );
  }
}

export default ListItem;
