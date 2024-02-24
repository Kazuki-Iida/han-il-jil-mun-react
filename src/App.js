import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom" // 追加
import AuthProvider from "./pages/contexts/AuthContext"
import Home from "./pages/Home" // Homeだけimport
import Login from './pages/Login'
import Register from './pages/Register'
import ShowPost from './pages/ShowPost'
import CreatePost from './pages/CreatePost'
import Notfound from './pages/Notofound'
import Header from './pages/components/Header'
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
            <Route path="/posts/create" element={ <CreatePost /> } />
          </Route>
          <Route path="/" element={ <Home /> } />
          <Route path="/posts/:post_id" element={ <ShowPost /> } />
          <Route path="*" element={ <Notfound /> } />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App
