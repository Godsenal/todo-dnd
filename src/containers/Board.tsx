import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DragDropContext, OnDragEndResponder, Droppable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import { ICardList, ICard } from '../models/card';
import { reorder, move } from '../utils/dnd';
import List from './List';
import EditInput from './EditInput';

export type AddCard = (listId: ICard['listId'], name: ICard['name']) => void;
export type RemoveCardList = (listId: ICard['listId']) => void;

let prevWidth = 0;

const Board = () => {
  const [cardLists, setCardLists] = useState<ICardList[]>([{ id: '1', name: 'a' }, { id: '2', name: 'b' }]);
  const [cards, setCards] = useState<{ [listId: string]: ICard[] }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onDragEnd: OnDragEndResponder = useCallback((result, provided) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (type === 'CARDLIST') {
      return setCardLists(prev => {
        const result = reorder(prev, source.index, destination.index);
        return result;
      })
    }
    if (source.droppableId === destination.droppableId) {
      return setCards(prev => {
        const result = reorder(prev[source.droppableId], source.index, destination.index);
        return {
          ...prev,
          [source.droppableId]: result,
        };
      })
    }
    else {
      return setCards(prev => {
        const [sResult, dResult] = move(prev[source.droppableId], prev[destination.droppableId] || [], source.index, destination.index);
        return {
          ...prev,
          [source.droppableId]: sResult,
          [destination.droppableId]: dResult,
        }
      })
    }
  }, []);

  const addCard: AddCard = useCallback((listId, name) => {
    const card = {
      id: uuid(),
      name,
      listId,
    };
    setCards(prev => ({
      ...prev,
      [listId]: prev[listId] ? [...prev[listId], card] : [card],
    }));
  }, []);
  const addCardList = useCallback((name: string) => {
    setCardLists(prev => ([...prev, { id: uuid(), name }]));
  }, []);
  const removeCardList: RemoveCardList = useCallback(listId => {
    setCardLists(prev => prev.filter(list => list.id !== listId));
  }, []);
  // 추가시 오른쪽으로 스크롤
  useEffect(() => {
    if (containerRef.current) {
      const { scrollWidth, scrollTop } = containerRef.current;
      if (scrollWidth > window.innerWidth && scrollWidth > prevWidth) {
        containerRef.current.scrollTo(scrollWidth, scrollTop);
        prevWidth = containerRef.current.scrollWidth;
      }
    }
  }, [cardLists]);
  return (
    <div ref={containerRef} className="w-full h-full overflow-x-auto whitespace-no-wrap">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="CARDLIST" direction="horizontal">
          {
            ({ innerRef, droppableProps, placeholder }) => (
              <div ref={innerRef} className="inline-block" {...droppableProps}>
                {
                  cardLists.map((cardList, index) => (
                    <List key={cardList.id} {...cardList} index={index} cards={cards[cardList.id] || []} addCard={addCard} removeCardList={removeCardList} />
                  ))
                }
                {placeholder}
                <div className="inline-block mx-3 align-top todo-w">
                  <EditInput text="+ Add a list" onSubmit={addCardList} />
                </div>
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Board;