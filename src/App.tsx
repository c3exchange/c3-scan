import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { useEffect, useState } from 'react';
import PersistQueryParam from './routes/PersistQueryParam';

function App() {
  const [shouldPersistEnv, setShouldPersistEnv] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('env') === 'test') {
      setShouldPersistEnv(true);
    }
  }, []);
  const basename = process.env.NODE_ENV === 'production' ? '/c3-scan' : '/';
  return (
    <Router basename={basename}>
      <GlobalContextProvider>
        <Layout>
          <Routes>
            <Route
              path="/*"
              element={<PersistQueryParam shouldPersist={shouldPersistEnv} />}
            />
          </Routes>
        </Layout>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
