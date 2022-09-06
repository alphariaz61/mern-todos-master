import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import protectedRequest from "../../scripts/protectedRequest";
import thunkPromiseHandler from "../../scripts/thunkPromiseHandler";


export const thunks = {
    fetchTodos : createAsyncThunk("todo/fetchTodos", async (_, T) => (
        thunkPromiseHandler(protectedRequest().get("/api/todos/me"), T)
    )),
    createTodo : createAsyncThunk("todo/createTodo", async (todo, T) => (
        thunkPromiseHandler(protectedRequest().post("/api/todos", todo), T)
    )),
    updateTodo : createAsyncThunk("todo/updateTodo", async (todo, T) => (
        thunkPromiseHandler(protectedRequest().put(`/api/todos/${todo._id}`, todo), T)
    )),
    deleteTodo : createAsyncThunk("todo/deleteTodo", async (todo, T) => (
        thunkPromiseHandler(protectedRequest().delete(`/api/todos/${todo._id}`), T)
    )),
    deleteAll : createAsyncThunk("todo/deleteAll", async (_, T) => (
        thunkPromiseHandler(protectedRequest().delete("/api/todos/me"), T)
    ))
}

export const { reducer, actions } = createSlice({
    name : "todo",
    initialState : { todos : [], numDispatches : 0 },
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
        addCase(thunks.createTodo.fulfilled, incrementCount)
        addCase(thunks.updateTodo.fulfilled, incrementCount)
        addCase(thunks.deleteTodo.fulfilled, incrementCount)
        addCase(thunks.deleteAll.fulfilled, incrementCount)
    }
})

const incrementCount = (s) => { s.numDispatches++ }