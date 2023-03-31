import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import './i18n'
import { AuthProvider } from './shared/contexts/AuthContext';
import { LoaderProvider } from './shared/contexts/LoaderContext';
import { OverlayProvider } from './shared/contexts/OverlayContext';


const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <LoaderProvider>
      <OverlayProvider>
        <Provider store={store}>
          <React.StrictMode>
            <MemoryRouter>
              <App />
            </MemoryRouter>
          </React.StrictMode>
        </Provider>
      </OverlayProvider>
    </LoaderProvider>
  </AuthProvider>
);
// CSR => Client Side Rendering
// SSR => Server Side Rendering Next.JS
//TODO: Parametreler ve SEO

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


