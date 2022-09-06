import { useNavigate } from "react-router-dom"
import ClearButton from "./ClearButton"

export default function Navbar () {
    const nav = useNavigate()
    return (
        <nav className="navbar bg-dark px-5 py-2 border-bottom">
            <div className="container-fluid">
                <span onClick={() => nav("/")} className="navbar-brand text-white pointer">
                    Mern Todos
                </span>
                <ClearButton/>
            </div>
        </nav>
    )
}