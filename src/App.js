
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './shared/navbar/Navbar';
import Homepage from './shared/homepage/Homepage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/login/LoginPage';
//react-router-dom
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
      <footer></footer>
    </div>
  );
}

export default App;
