import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import productService from './productService'
import { extractErrorMessage } from '../utils'

const initialState = {
  products: null,
  isLoading: false,
}

// Get all products
export const getAllProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
  try {
    // const token = thunkAPI.getState().auth.user.token
    // return await ticketService.getTickets(token)
    return await productService.getAllProducts()
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      /* .addCase(getTickets.pending, (state) => {
        // NOTE: clear single ticket on tickets page, this replaces need for
        // loading state on individual ticket
        state.ticket = null
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload
      }) */
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default productSlice.reducer
