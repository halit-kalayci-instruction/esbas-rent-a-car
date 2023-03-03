import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "toastr/build/toastr.min.css";
import Navbar from './shared/components/navbar/Navbar';
import Homepage from './shared/pages/homepage/Homepage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/login/pages/LoginPage';
import { LoaderProvider } from './shared/contexts/LoaderContext';
import Loader from './shared/components/loader/Loader';
import { AuthProvider } from './shared/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
//react-router-dom

// createContext, useContext
function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log(i18n);
  }, []);

  return (
    <AuthProvider>
      <LoaderProvider>
        <div className="App">
          <p>{t('welcomeText')}</p>
          <Loader>
          </Loader>
          <Navbar />
          <Routes>
            <Route path="" element={<Homepage />} />

            <Route path="homepage" element={<Homepage />} />

            <Route path="login" element={<LoginPage />} />
          </Routes>
          <footer></footer>
        </div>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
