import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Explorer from '../pages/Explorer/Explorer';
import Decoder from '../pages/Decoder/Decoder';
import { AppRoutes } from './routes';

const PersistQueryParam = ({ shouldPersist }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (shouldPersist && !queryParams.has('env')) {
      queryParams.set('env', 'test');
      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }
  }, [location, navigate, shouldPersist]);

  return (
    <Routes>
      <Route path={AppRoutes.EXPLORER} element={<Explorer />} />
      <Route path={AppRoutes.DECODER} element={<Decoder />} />
      <Route path="/*" element={<Navigate to={AppRoutes.EXPLORER} replace />} />
    </Routes>
  );
};

export default PersistQueryParam;
