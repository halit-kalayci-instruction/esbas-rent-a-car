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
//react-router-dom

// createContext, useContext
function App() {
  const overlayContext = useOverlay();
  return (
    <div className="App">
      <Modal></Modal>
      {overlayContext.show && <div className='overlay'></div>}
      <Loader />
      <Navbar />
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="homepage" element={<Homepage />} />
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
