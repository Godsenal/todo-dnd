import React, { memo, useCallback, useMemo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import isEqual from 'lodash/isEqual';
import Card from './Card';
import EditInput from './EditInput';
import { AddCard, RemoveCardList, UpdateCard, UpdateCardList } from './Board';
import { ICard, ICardList } from '../models/card';

interface ListProps extends ICardList {
  cards: ICard[],
  index: number;
  addCard: AddCard;
  removeCardList: RemoveCardList;
  updateCard: UpdateCard;
  updateCardList: UpdateCardList;
}

const getDroppableStyle = (isDraggingOver: boolean) => {
  return {};
}

const List: React.SFC<ListProps> = ({ id, index, name, cards, addCard, removeCardList, updateCard, updateCardList }) => {
  const handleAddCard = useCallback((input: string) => {
    addCard(id, input);
  }, [addCard, id]);
  const handleUpdateListName = useCallback((input: string) => {
    updateCardList(id, { name: input });
  }, [id, updateCardList])
  const removeCurrentList = useMemo(() => removeCardList.bind(null, id), [id, removeCardList]);
  return (
    <Draggable draggableId={id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => {
        return (
          <div ref={innerRef} {...draggableProps} {...dragHandleProps} className="inline-block align-top shadow-md todo p-6 m-3 bg-gray-200 rounded">
            <div className="flex">
              <div className="text-lg font-bold px-2 flex-1">
                <EditInput className="bg-inherit font-bold text-left w-full" init={name} text={name} onSubmit={handleUpdateListName} />
              </div>
              <div>
                <button onClick={removeCurrentList}><i className="my-4 far fa-trash-alt"></i></button>
              </div>
            </div>
            <Droppable droppableId={id}>
              {
                (provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 50 }}>
                    {
                      cards.map((card, i) => (
                        <Card key={card.id} index={i} updateCard={updateCard} {...card} />
                      ))
                    }
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
            <EditInput onSubmit={handleAddCard} text="Add a TODO" />
          </div>
        )
      }}
    </Draggable>
  )
}

export default memo(List, isEqual);