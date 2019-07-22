import React, { useState, memo, useCallback } from "react";
import { ICard } from "../models/card";
import { Draggable } from "react-beautiful-dnd";
import { UpdateCard, RemoveCard } from "./Board";
import { Modal } from "../components";
import CardEdit from "./CardEdit";

interface CardProps extends ICard {
  index: number;
  removeCard: RemoveCard;
  updateCard: UpdateCard;
}

const Card: React.SFC<CardProps> = ({
  id,
  name,
  description = "",
  listId,
  index,
  removeCard,
  updateCard
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleRemoveCard = useCallback(() => {
    removeCard(listId, id);
    setOpen(false);
  }, [listId, id, removeCard]);
  const handleUpdateCard = useCallback(
    (updated: Partial<ICard>) => {
      updateCard(listId, id, updated);
      setOpen(false);
    },
    [listId, id, updateCard]
  );
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {({ dragHandleProps, draggableProps, innerRef }) => (
          <div
            ref={innerRef}
            {...dragHandleProps}
            {...draggableProps}
            className="w-full rounded my-4 py-4 px-2 shadow bg-white hover:bg-gray-300"
            onClick={() => setOpen(true)}
          >
            {name}
          </div>
        )}
      </Draggable>
      {open && (
        <Modal open={open} onClose={handleClose} title="TODO">
          <CardEdit
            name={name}
            description={description}
            removeCard={handleRemoveCard}
            updateCard={handleUpdateCard}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(Card);
