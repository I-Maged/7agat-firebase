import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import userService from './userService'
import { extractErrorMessage } from '../utils'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isLoading: false,
}

export const signIn = createAsyncThunk('user/signIn', async (signInData, thunkAPI) => {
  try {
    return await userService.signIn(signInData)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const signOut = createAction('user/signOut', () => {
  userService.signOutFromBrowser()
  return {}
})

export const signUp = createAsyncThunk('auth/signUp', async (signUpData, thunkAPI) => {
  try {
    const newUser = await userService.signUp(signUpData)
    return await userService.signIn(newUser)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = false
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(signOut, (state) => {
        state.user = null
        state.isLoading = false
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default userAuthSlice.reducer
