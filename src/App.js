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
import AddCar from './features/admin/car/addCar/AddCar';
import CarList from './features/admin/car/carList/CarList';
import ProtectedRoute from './shared/components/protected-route/ProtectedRoute'
import BrandList from './features/admin/brand/brandList/BrandList';
import AddBrand from './features/admin/brand/addBrand/AddBrand';
import { OverlayContext, OverlayProvider, useOverlay } from './shared/contexts/OverlayContext';
import { useContext, useEffect } from 'react';
import Modal from './shared/components/modal/Modal';
import DataTableFilter from './shared/components/data-table-filter/DataTableFilter';
//react-router-dom
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import Subscribers from './shared/components/subscribers/Subscribers';
import Head from './shared/components/head/Head';
import Chat from './features/chat/Chat';

// createContext, useContext
function App() {
  const overlayContext = useOverlay();
  useEffect(() => {
    addLocale('tr', {
      clear: 'Temizle',
      filter: 'Filtre',
      noFilter: "Filtresiz",
      notEquals: "Eşit olmayan",
      equals: "Eşit",
      endsWith: "İle Biten",
      notContains: "İçermeyen",
      contains: "İçeren",
      startsWith: "İle Başlayan",
      lt: "Daha Az",
      lte: "Daha Az veya Eşit",
      gt: "Daha Çok",
      gte: "Daha Çok veya Eşit",
      dateIs: "Tarihinde",
      dateIsNot: "Tarihinde Olmayan",
      dateBefore: "Tarihinden Önce",
      dateAfter: "Tarihinden Sonra"
    });
    locale("tr")
  }, [])
  return (
    <div className="App">
      <Head></Head>
      <Subscribers />
      <Modal></Modal>
      {overlayContext.show && <div className='overlay'></div>}
      <Loader />
      <Navbar />
      <Routes>
        <Route path="" element={<Homepage />} />

        <Route path="*" element={<>404 not found</>} />


        <Route path="data" element={<DataTableFilter />} />

        <Route path="homepage" element={<Homepage />} />
        <Route path="chat" element={<Chat />} />


        <Route path="login" element={<LoginPage />} />

        <Route path="car/add" element={<AddCar />} />

        <Route path="car/update/:id"
          element={
            <ProtectedRoute roles={["Cars.Update"]}>
              <AddCar />
            </ProtectedRoute>} />

        <Route path="brand/list"
          element={
            <ProtectedRoute roles={["Admin", "Brands.Create", "Brands.Update", "Brands.Delete"]}>
              <BrandList />
            </ProtectedRoute>} />

        <Route path="brand/add"
          element={
            <ProtectedRoute roles={["Admin", "Brands.Create"]}>
              <AddBrand />
            </ProtectedRoute>} />

        <Route path="brand/update/:id"
          element={
            <ProtectedRoute roles={["Admin", "Brands.Update"]}>
              <AddBrand />
            </ProtectedRoute>} />

        <Route path="car/list" element={<CarList />} />
      </Routes>
      <footer></footer>
    </div>
  );
}

export default App;
