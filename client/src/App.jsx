import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

export default function App () {
    return (
        <div className="wrapper bg-dark text-white">
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    ) 
}
