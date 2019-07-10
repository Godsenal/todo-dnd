import React, { useState, memo, useCallback } from 'react';
import { ICard } from '../models/card';
import { Draggable } from 'react-beautiful-dnd';
import { UpdateCard } from './Board';
import { Modal } from '../components';
import CardEdit from './CardEdit';

interface CardProps extends ICard {
  index: number;
  updateCard: UpdateCard;
};

const Card: React.SFC<CardProps> = ({ id, name, description = '', listId, index, updateCard }) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => { setOpen(false) }, []);
  const handleUpdateCard: UpdateCard = useCallback((...args) => {
    updateCard.call(null, ...args);
    setOpen(false);
  }, [updateCard]);
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {({ dragHandleProps, draggableProps, innerRef }) => (
          <div ref={innerRef} {...dragHandleProps} {...draggableProps} className="w-full rounded my-4 py-4 px-2 shadow bg-white hover:bg-gray-300" onClick={() => setOpen(true)}>
            {name}
          </div>
        )}
      </Draggable>
      {
        open && (
          <Modal open={open} onClose={handleClose}>
            <CardEdit id={id} name={name} description={description} listId={listId} updateCard={handleUpdateCard} />
          </Modal>
        )
      }

    </>
  )
}

export default memo(Card);