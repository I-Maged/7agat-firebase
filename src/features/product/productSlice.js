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
    return await productService.getAllProducts()
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const storeImage = createAsyncThunk('products/storeImage', async (image, thunkAPI) => {
  try {
    // return await productService.storeImage(image)
    const img = await productService.storeImage(image)
    console.log(img)
    return img
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const addNewProductData = createAsyncThunk('products/addNewProductData', async (productData, thunkAPI) => {
  try {
    return await productService.addNewProductData(productData)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
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
      .addCase(storeImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(storeImage.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(storeImage.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addNewProductData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewProductData.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addNewProductData.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default productSlice.reducer
