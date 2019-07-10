import React, { useState, memo, useRef, useEffect } from 'react';

interface CardInputProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onSubmit'> {
  init?: string;
  text: string;
  onSubmit: (input: string) => void;
}

const EditInput: React.SFC<CardInputProps> = ({ init = '', text, onSubmit, ...props }) => {
  const [input, setInput] = useState(init);
  const [isEdit, setIsEdit] = useState(false);
  const containerRef = useRef<HTMLFormElement | null>(null);
  const handleToggleEdit = () => {
    setIsEdit(prev => !prev);
    setInput(init);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(input);
    setIsEdit(false);
  }
  useEffect(() => {
    if (isEdit && containerRef.current) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains((e.target as HTMLInputElement))) {
          setIsEdit(false);
        }
      }
      window.addEventListener('mousedown', handleOutsideClick);
      return () => window.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isEdit]);
  return (
    <div className="my-4">
      {isEdit ? (
        <form ref={containerRef} onSubmit={handleFormSubmit}>
          <div>
            <input
              autoFocus
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input}
              onChange={handleChange} />
          </div>
          <div className="text-right">
            <button className="text-white bg-green-500 hover:bg-green-700 py-2 px-3 my-2 rounded" type="submit">Done</button>
            <button className="py-2 px-3 text-gray-500"><i className="fas fa-times" onClick={handleToggleEdit} /></button>
          </div>
        </form>
      ) : (
          <button className="bg-white hover:bg-gray-300 font-bold w-full py-2 px-3 rounded" onClick={handleToggleEdit} {...props}>
            {text}
          </button>
        )}
    </div>

  )
}

export default memo(EditInput);