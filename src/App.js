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
import CarList from './features/admin/car/list/CarList';
//react-router-dom

// createContext, useContext
function App() {
  return (
    <AuthProvider>
      <LoaderProvider>
        <div className="App">
          <Loader>
          </Loader>
          <Navbar />
          <Routes>
            <Route path="" element={<Homepage />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="car/add" element={<AddCar />} />
            <Route path="car/update/:id" element={<AddCar />} />
            <Route path="car/list" element={<CarList />} />
          </Routes>
          <footer></footer>
        </div>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
