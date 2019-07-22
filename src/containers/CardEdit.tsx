import React, { memo, useState, useCallback } from "react";
import { ICard } from "../models/card";
import { useInput } from "../hooks";
import Confirm from "../components/Confirm";

interface CardEditProps extends Partial<ICard> {
  removeCard: () => void;
  updateCard: (updated: Partial<ICard>) => void;
}

const CardEdit: React.SFC<CardEditProps> = ({
  name: initName = "",
  description: initDescription = "",
  removeCard,
  updateCard
}) => {
  const [confirm, setConfirm] = useState(false);
  const [name, handleName] = useInput(initName);
  const [description, handleDescription] = useInput(initDescription);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCard({ name, description });
  };
  const openConfirm = useCallback(() => setConfirm(true), []);
  const closeConfirm = useCallback(() => setConfirm(false), []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            name
          </label>
          <input
            id="name"
            value={name}
            onChange={handleName}
            className="w-full p-2 rounded bg-gray-300 focus:bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescription}
            className="w-full p-2 rounded bg-gray-300 focus:bg-gray-100"
          />
        </div>
        <div className="text-right">
          <button
            type="button"
            className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 my-2 mx-2 rounded"
            onClick={openConfirm}
          >
            Delete this card
          </button>
          <button
            className="text-white bg-green-500 hover:bg-green-700 py-2 px-3 my-2 rounded"
            type="submit"
          >
            Done
          </button>
        </div>
      </form>
      {confirm && (
        <Confirm
          open={confirm}
          onClose={closeConfirm}
          title="Are you sure?"
          message="This process cannot be undone."
          onAgree={removeCard}
          onDisagree={closeConfirm}
          agreeLabel="Delete"
        />
      )}
    </>
  );
};

export default memo(CardEdit);
