import React, { useState, memo, useRef, useEffect } from 'react';

interface CardInputProps {
  init?: string;
  text: string;
  onSubmit: (input: string) => void;
}

const EditInput: React.SFC<CardInputProps> = ({ init = '', text, onSubmit }) => {
  const [input, setInput] = useState(init);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleToggleEdit = () => setIsEdit(prev => !prev);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
    setIsEdit(false);
  }
  useEffect(() => {
    if (isEdit && inputRef.current) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains((e.target as HTMLInputElement))) {
          setIsEdit(false);
          setInput('');
        }
      }
      window.addEventListener('mousedown', handleOutsideClick);
      return () => window.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isEdit]);

  return (
    <div className="my-4">
      {isEdit ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            autoFocus
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={input}
            onChange={handleChange} />
        </form>
      ) : (
          <button className="bg-white hover:bg-gray-300 font-bold w-full py-2 px-3 rounded" onClick={handleToggleEdit}>
            {text}
          </button>
        )}
    </div>

  )
}

export default memo(EditInput);