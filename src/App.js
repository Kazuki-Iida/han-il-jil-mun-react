import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom" // 追加
import AuthProvider from "./pages/contexts/AuthContext"
import Home from "./pages/Home" // Homeだけimport
import Login from './pages/Login'
import Register from './pages/Register'
import Notfound from './pages/Notofound'
import AuthMiddleware from './pages/Middlewares/AuthMiddleware'
import GuestMiddleware from './pages/Middlewares/GuestMiddleware'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes> {/*Routesで囲む*/}
          <Route element={<GuestMiddleware />} >
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
          </Route>
          <Route element={<AuthMiddleware />} >

          </Route>
          <Route path="/" element={ <Home /> } />
          <Route path="*" element={ <Notfound /> } />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
