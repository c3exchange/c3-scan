import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoutes } from './constants/routes';
import Explorer from './pages/Explorer/Explorer';
import Decoder from './pages/Decoder/Decoder';
import Layout from './Layout';
import { GlobalContextProvider } from './contexts/GlobalContext';

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/c3-scan' : '/';
  return (
    <Router basename={basename}>
      <GlobalContextProvider>
        <Layout>
          <Routes>
            <Route path={AppRoutes.EXPLORER} element={<Explorer />} />
            <Route path={AppRoutes.DECODER} element={<Decoder />} />
            <Route path="/*" element={<Navigate to={AppRoutes.EXPLORER} />} />
          </Routes>
        </Layout>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
