import React, { memo, useCallback, useMemo, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import isEqual from "lodash/isEqual";
import Card from "./Card";
import EditInput from "./EditInput";
import {
  AddCard,
  RemoveCardList,
  UpdateCard,
  UpdateCardList,
  RemoveCard
} from "./Board";
import { ICard, ICardList } from "../models/card";
import Confirm from "../components/Confirm";

interface ListProps extends ICardList {
  cards: ICard[];
  index: number;
  addCard: AddCard;
  removeCard: RemoveCard;
  removeCardList: RemoveCardList;
  updateCard: UpdateCard;
  updateCardList: UpdateCardList;
}

const List: React.SFC<ListProps> = ({
  id,
  index,
  name,
  cards,
  addCard,
  removeCard,
  removeCardList,
  updateCard,
  updateCardList
}) => {
  const [confirm, setConfirm] = useState(false);
  const openConfirm = useCallback(() => setConfirm(true), []);
  const closeConfirm = useCallback(() => setConfirm(false), []);
  const handleAddCard = useCallback(
    (input: string) => {
      addCard(id, input);
    },
    [addCard, id]
  );
  const handleUpdateListName = useCallback(
    (input: string) => {
      updateCardList(id, { name: input });
    },
    [id, updateCardList]
  );
  const removeCurrentList = useMemo(() => removeCardList.bind(null, id), [
    id,
    removeCardList
  ]);
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {({ dragHandleProps, draggableProps, innerRef }) => {
          return (
            <div
              ref={innerRef}
              {...draggableProps}
              {...dragHandleProps}
              className="inline-block align-top shadow-md todo p-6 m-3 bg-gray-200 rounded"
            >
              <div className="flex">
                <div className="text-lg font-bold px-2 flex-1">
                  <EditInput
                    className="bg-inherit font-bold text-left w-full"
                    init={name}
                    text={name}
                    onSubmit={handleUpdateListName}
                  />
                </div>
                <div>
                  <button onClick={openConfirm}>
                    <i className="my-4 far fa-trash-alt" />
                  </button>
                </div>
              </div>
              <Droppable droppableId={id}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ minHeight: 50 }}
                  >
                    {cards.map((card, i) => (
                      <Card
                        key={card.id}
                        index={i}
                        removeCard={removeCard}
                        updateCard={updateCard}
                        {...card}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <EditInput onSubmit={handleAddCard} text="Add a TODO" />
            </div>
          );
        }}
      </Draggable>
      {confirm && (
        <Confirm
          open={confirm}
          onClose={closeConfirm}
          title="Are you sure?"
          message="This process cannot be undone."
          onAgree={removeCurrentList}
          onDisagree={closeConfirm}
          agreeLabel="Delete"
        />
      )}
    </>
  );
};

export default memo(List, isEqual);
