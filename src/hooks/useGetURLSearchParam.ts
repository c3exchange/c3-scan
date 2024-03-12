import { useLocation } from 'react-router-dom';

export const useURLSearchParam = () => {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);

  const getURLSearchParam = (paramName: string) => {
    const parameter = queryParameters.has(paramName)
      ? queryParameters.get(paramName) || undefined
      : undefined;
    return parameter;
  };
  return { getURLSearchParam, queryParameters };
};
