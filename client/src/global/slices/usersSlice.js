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
        Array.from(["login", "register"]).forEach((n) => {
            const current = thunks[n]
            addCase(current.pending, registerAndLoginPending)// Pending
            addCase(current.fulfilled, registerAndLoginFulfilled)// Fulfilled
            addCase(current.rejected, registerAndLoginRejected)// Rejected
        })
    }
})

const registerAndLoginPending = (state) => {
    state.isLoading = true
    console.log("Auth Pending!")
}

const registerAndLoginFulfilled = (state, { payload:user }) => {
    state.isLoading = false
    state.user = user
    window.localStorage.setItem("user", JSON.stringify(user))
    console.log("Auth Fulfilled", user)
}

const registerAndLoginRejected = (state, { payload:errorMessage }) => {
    alert(errorMessage || "Auth Rejected")
    state.isLoading = false
    console.log("Auth Rejected", errorMessage)
}