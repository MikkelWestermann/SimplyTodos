import React from 'react';
import ListItem from './ListItem';

const List = ({ todos, onRemoveTodo, color }) => {
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
              color={color}
            />
          )
        })
      }
    </div>
  );
}

export default List;
