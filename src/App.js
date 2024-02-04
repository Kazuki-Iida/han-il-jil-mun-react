import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"; // 追加
import AuthProvider from "./pages/contexts/AuthContext";
import Home from "./pages/Home" // Homeだけimport
import Login from './pages/Login';
import Register from './pages/Register';
import Notfound from './pages/Notofound';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes> {/*Routesで囲む*/}
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="*" element={ <Notfound /> } />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
