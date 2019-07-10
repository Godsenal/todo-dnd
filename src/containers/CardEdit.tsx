import React, { memo } from 'react';
import { ICard } from '../models/card';
import { useInput } from '../hooks';
import { UpdateCard } from './Board';

interface CardEditProps extends ICard {
  updateCard: UpdateCard;
};

const CardEdit: React.SFC<CardEditProps> = ({ id, listId, name: initName, description: initDescription = '', updateCard }) => {
  const [name, handleName] = useInput(initName);
  const [description, handleDescription] = useInput(initDescription);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCard(listId, id, { name, description });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">name</label>
        <input id="name" value={name} onChange={handleName} className="w-full p-2 rounded bg-gray-300 focus:bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">description</label>
        <textarea id="description" value={description} onChange={handleDescription} className="w-full p-2 rounded bg-gray-300 focus:bg-gray-100" />
      </div>
      <div className="text-right">
        <button className="text-white bg-green-500 hover:bg-green-700 py-2 px-3 my-2 rounded" type="submit">Done</button>
      </div>
    </form>
  )
}

export default memo(CardEdit);
