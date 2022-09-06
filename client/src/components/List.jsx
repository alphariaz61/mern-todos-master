import { useDispatch, useSelector } from "react-redux"
import { thunks as todosThunks } from "../global/slices/todosSlice"
import Icon from "./Icon"

export default function List () {
    const dispatch = useDispatch()
    const { todos } = useSelector((s) => s.todos)
    
    const updateTodo = (todo, update) => {
        dispatch(todosThunks.updateTodo({ ...todo, ...update }))
    }

    const deleteTodo = (todo) => {
        if (window.confirm("Delete This Item?")) dispatch(todosThunks.deleteTodo(todo))
    }
    
    if (todos.length === 0) return <p className="text-center fs-3 mt-5">Nothing In My Todo List</p>
    return (
        <ul id="list" className="list-group rounded-0 pb-3">
            {todos.map((todo) => (
                <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span 
                        onClick={() => updateTodo(todo, { isComplete : !todo.isComplete })}  
                        className={todo.isComplete ? "text-decoration-line-through" : ""}
                    >
                        {todo.text}
                    </span>
                    <div>
                        <Icon 
                            onClick={() => updateTodo(todo, { text : prompt("Update Text:", todo.text) })} 
                            classes={["me-3"]} 
                            type="pencil-square" 
                            color="warning" 
                        />
                        <Icon 
                            onClick={() => deleteTodo(todo)} 
                            type="trash" 
                            color="danger" 
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}