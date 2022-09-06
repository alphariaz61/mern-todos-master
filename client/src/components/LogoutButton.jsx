import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { actions as usersActions } from "../global/slices/usersSlice"
import { actions as todosActions } from "../global/slices/todosSlice"

export default function LogoutButton () {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(s => s.users)
    
    const logout = () => {
        dispatch(usersActions.logout())
        dispatch(todosActions.clearTodos())
        nav("/login")
    }

    const title = `Logged in as ${user?.email}`

    if (!user) return <></>//don't render if there is no user
    return (
        <button        
            className="btn text-success fw-bolder"
            onClick={logout}
            title={title}
        >
            Logout 
        </button>
    )
}