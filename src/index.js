import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getStore } from './store/configureStore';
import './i18n'
import { AuthProvider } from './shared/contexts/AuthContext';
import { LoaderProvider } from './shared/contexts/LoaderContext';
import { OverlayProvider } from './shared/contexts/OverlayContext';
import { HeadProvider } from './shared/contexts/HeadContext';


const store = getStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HeadProvider>
    <AuthProvider>
      <LoaderProvider>
        <OverlayProvider>
          <Provider store={store}>
            <React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>
          </Provider>
        </OverlayProvider>
      </LoaderProvider>
    </AuthProvider>
  </HeadProvider>
);
// Crawling-Indexing-Serving and Ranking
//! setTimeout kullanımı sakıncalı => google robotlarının sitemizi indexlerken 
//! /get-brands /Get-Brands  => # /get-brands?brandId=1 /get-brands?brandId=2  /get-brands/1 /get-brands/2
//! meta
//! href ve onClick
//! 404 sayfası


// CSR => Client Side Rendering React
// SSR => Server Side Rendering Next.JS

// CSR'Da serverin görevi => JS dosyasını Client'a göndermek
// SSR => dosya göndermek yok

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


