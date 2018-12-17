import React from 'react';
import ListItem from './ListItem';

const List = ({ todos, onRemoveTodo, color, userEmail, isSignedIn }) => {
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
              userEmail={userEmail}
              isSignedIn={isSignedIn}
            />
          )
        })
      }
    </div>
  );
}

export default List;
