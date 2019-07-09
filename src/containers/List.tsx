import React, { memo, useCallback, useMemo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import isEqual from 'lodash/isEqual';
import Card from './Card';
import EditInput from './EditInput';
import { AddCard, RemoveCardList } from './Board';
import { ICard, ICardList } from '../models/card';

interface ListProps extends ICardList {
  cards: ICard[],
  index: number;
  addCard: AddCard;
  removeCardList: RemoveCardList;
}

const getDroppableStyle = (isDraggingOver: boolean) => {
  return {};
}

const List: React.SFC<ListProps> = ({ id, index, name, cards, addCard, removeCardList }) => {
  const handleSubmit = useCallback((input: string) => {
    addCard(id, input);
  }, [addCard, id]);
  const removeCurrentList = useMemo(() => removeCardList.bind(null, id), [id, removeCardList]);
  return (
    <Draggable draggableId={id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => {
        return (
          <div ref={innerRef} {...draggableProps} {...dragHandleProps} className="inline-block align-top shadow-md todo p-6 m-3 bg-gray-200">
            <div className="flex">
              <div className="text-lg font-bold px-2 flex-1">
                {name}
              </div>
              <div>
                <button onClick={removeCurrentList}><i className="far fa-trash-alt"></i></button>
              </div>
            </div>
            <Droppable droppableId={id}>
              {
                (provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 50 }}>
                    {
                      cards.map((card, i) => (
                        <Card key={card.id} index={i} {...card} />
                      ))
                    }
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
            <EditInput onSubmit={handleSubmit} text="Add a TODO" />
          </div>
        )
      }}
    </Draggable>
  )
}

export default memo(List, isEqual);