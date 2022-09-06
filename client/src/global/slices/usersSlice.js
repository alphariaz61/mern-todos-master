import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import thunkPromiseHandler from "../../scripts/thunkPromiseHandler"

export const thunks = {
    register : createAsyncThunk("auth/register", async (form, T) => (
        thunkPromiseHandler(axios.post("/api/users/register", form), T)
    )),
    login : createAsyncThunk("auth/login", async (form, T) => (
        thunkPromiseHandler(axios.post("/api/users/login", form), T)
    ))
}

export const { reducer, actions } = createSlice({
    name : "users",
    initialState : {
        isLoading : false,
        user : JSON.parse(window.localStorage.getItem("user"))
    },
    reducers : {
        logout (state) {
            window.localStorage.clear()
            state.user = null
        }
    },
    extraReducers ({addCase}) {
        // Pending
        addCase(thunks.login.pending, registerAndLoginPending)
        addCase(thunks.register.pending, registerAndLoginPending)
        // Fulfilled
        addCase(thunks.register.fulfilled, registerAndLoginFulfilled)
        addCase(thunks.login.fulfilled, registerAndLoginFulfilled)
        // Rejected
        addCase(thunks.register.rejected, registerAndLoginRejected)
        addCase(thunks.login.rejected, registerAndLoginRejected)
    }
})

const registerAndLoginPending = (state) => {
    state.isLoading = true
    console.log("auth pending!")
}

const registerAndLoginFulfilled = (state, { payload:user }) => {
    state.isLoading = false
    state.user = user
    window.localStorage.setItem("user", JSON.stringify(user))
    console.log("authentication fulfilled!", user)
}

const registerAndLoginRejected = (state, { payload:errorMessage }) => {
    alert(errorMessage)
    state.isLoading = false
    console.log("auth rejected!", errorMessage)
}