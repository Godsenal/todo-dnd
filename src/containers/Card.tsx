import React, { memo } from 'react';
import { ICard } from '../models/card';
import { Draggable } from 'react-beautiful-dnd';

interface CardProps extends ICard {
  index: number;
};

const Card: React.SFC<CardProps> = ({ id, name, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <div ref={innerRef} {...dragHandleProps} {...draggableProps} className="w-full rounded my-4 py-4 px-2 shadow bg-white">
          {name}
        </div>
      )}
    </Draggable>
  )
}

export default memo(Card);