import { useCallback } from 'react';
import useToast from './useToast';

type PasteFunction = (text: string) => void;

const usePaste = () => {
  const toast = useToast();
  const paste = useCallback(async (pasteFunction: PasteFunction) => {
    if (navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText();
        pasteFunction(text);
      } catch (error) {
        toast.error({ title: 'Error on paste', message: 'Error pasting text' });
      }
    } else {
      toast.error({ title: 'Error on paste', message: 'Clipboard not available' });
    }
  }, []);
  return { paste };
};

export default usePaste;
