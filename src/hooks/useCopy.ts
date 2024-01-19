import { useCallback } from 'react';
import useToast from './useToast';

const useCopy = () => {
  const toast = useToast();
  const copy = useCallback(async (text: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success({ title: 'Success copy', message: `${text} copied to clipboard` });
      } catch (error) {
        toast.error({ title: 'Error on copy', message: 'Error copying text' });
      }
    }
  }, []);
  return { copy };
};

export default useCopy;
