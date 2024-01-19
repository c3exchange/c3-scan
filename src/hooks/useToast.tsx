import { useMemo } from 'react';
import { ToastOptions, toast } from 'react-toastify';
import Toast from '../components/Toast/Toast';
import Icon from '../components/Icon/Icon';

export interface ToastData {
  title: string;
  message: string;
}

const useToast = () => {
  const defaultOptions: ToastOptions = useMemo(
    () => ({
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    }),
    []
  );

  const success = (data: ToastData) => {
    toast.success(<Toast message={data.message} title={data.title} />, {
      ...defaultOptions,
      toastId: data.title,
      icon: <Icon name="toastSuccess" height={24} width={24} />,
    });
  };
  const error = (data: ToastData) => {
    toast.error(<Toast message={data.message} title={data.title} />, {
      ...defaultOptions,
      toastId: data.title,
      icon: <Icon name="toastError" height={24} width={24} />,
    });
  };
  return {
    success,
    error,
  };
};

export default useToast;
