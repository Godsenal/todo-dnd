import { useState, useCallback } from "react";

const useInput = (init: string) => {
  const [input, setInput] = useState(init);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);
  return [input, handleChange, setInput] as const;
}

export default useInput;