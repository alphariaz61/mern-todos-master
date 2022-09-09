import { useDispatch, useSelector } from "react-redux"
import { thunks as todosThunks } from "../global/slices/todosSlice"
import Empty from "./Empty"
import Icon from "./Icon"
import Spinner from "./Spinner"
import TodoText from "./TodoText"

export default function List () {
    const dispatch = useDispatch()
    const { todos, isLoading } = useSelector((s) => s.todos)

    const deleteTodo = (todo) => {
        if (window.confirm("Delete This Item?")) dispatch(todosThunks.deleteTodo(todo))
    }

    const updateTodoText = (todo) => {
        dispatch(todosThunks.updateTodo({ ...todo, text : prompt("Update Text:", todo.text) }))
    }

    const updateTodoIsComplete = (todo) => {
        dispatch(todosThunks.updateTodo({ ...todo, isComplete : !todo.isComplete }))
    }
    
    if ((todos.length === 0) && !isLoading) return <Empty/>
    return (
        <ul id="list" className="list-group rounded-0 pb-3">
            {todos.map((todo) => (
                <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <TodoText todo={todo} updateTodoIsComplete={updateTodoIsComplete} />
                    <div>
                        <Icon 
                            onClick={() => updateTodoText(todo)} 
                            type="pencil-square" 
                            color="warning" 
                            classes={["me-3"]} 
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