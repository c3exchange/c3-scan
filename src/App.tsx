import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { useEffect, useState } from 'react';
import PersistQueryParam from './routes/PersistQueryParam';
import ReactGA from 'react-ga4';

function App() {
  const [shouldPersistEnv, setShouldPersistEnv] = useState(false);
  ReactGA.initialize('G-22FJC5G2E2');
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('env') === 'test') setShouldPersistEnv(true);
  }, []);
  return (
    <Router basename="/">
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
