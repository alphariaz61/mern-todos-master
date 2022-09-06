import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import protectedRequest from "../../scripts/protectedRequest";
import thunkPromiseHandler from "../../scripts/thunkPromiseHandler";

export const thunks = {
    fetchTodos : createAsyncThunk("todos/fetchTodos", async (_, T) => (
        thunkPromiseHandler(protectedRequest().get("/api/todos/me"), T)
    )),
    createTodo : createAsyncThunk("todos/createTodo", async (todo, T) => (
        thunkPromiseHandler(protectedRequest().post("/api/todos", todo), T)
    )),
    updateTodo : createAsyncThunk("todos/updateTodo", async (todo, T) => (
        thunkPromiseHandler(protectedRequest().put(`/api/todos/${todo._id}`, todo), T)
    )),
    deleteTodo : createAsyncThunk("todos/deleteTodo", async (todo, T) => (
        thunkPromiseHandler(protectedRequest().delete(`/api/todos/${todo._id}`), T)
    )),
    deleteAll : createAsyncThunk("todos/deleteAll", async (_, T) => (
        thunkPromiseHandler(protectedRequest().delete("/api/todos/me"), T)
    ))
}

export const { reducer, actions } = createSlice({
    name : "todos",
    initialState : { 
        todos : [], 
        numDispatches : 0 
    },
    reducers : {
        clearTodos (state) {
            state.todos = []
            state.numDispatches = 0
        }
    },
    extraReducers ({addCase}) {
        addCase(thunks.fetchTodos.fulfilled, (state, {payload:todos}) => {
            state.todos = todos
        })
        addCase(thunks.createTodo.rejected, (state, {payload:todos}) => { 
            alert("Unable To Add Todo") 
        })
        addCase(thunks.createTodo.fulfilled, incrementCount)
        addCase(thunks.updateTodo.fulfilled, incrementCount)
        addCase(thunks.deleteTodo.fulfilled, incrementCount)
        addCase(thunks.deleteAll.fulfilled, incrementCount)
        // Rejected Cases
        addCase(thunks.updateTodo.rejected, rejectedPromise)
        addCase(thunks.deleteTodo.rejected, rejectedPromise)
        addCase(thunks.deleteAll.rejected, rejectedPromise)
    }
})

const incrementCount = (s) => { s.numDispatches++ }
const rejectedPromise = (s, a) => { alert("Network Error") }