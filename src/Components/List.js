import React from 'react';
import ListItem from './ListItem';

const List = ({ todos, onRemoveTodo }) => {
  return (
    <div>
      {
        todos.map((item, i) => {
          return (
              <ListItem
              todo={item}
              key={i}
              index={i}
              onRemoveTodo={onRemoveTodo}
            />
          )
        })
      }
    </div>
  );
}

export default List;
