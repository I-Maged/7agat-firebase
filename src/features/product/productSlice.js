import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'
import { extractErrorMessage } from '../utils'

const initialState = {
  products: null,
  userProducts: null,
  product: null,
  isLoading: false,
}

export const getAllProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
  try {
    return await productService.getAllProducts()
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

export const getUserProducts = createAsyncThunk('products/userProducts', async (userId, thunkAPI) => {
  try {
    return await productService.getUserProducts(userId)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})
export const getProductById = createAsyncThunk('product/productById', async (productId, thunkAPI) => {
  try {
    return await productService.getProductById(productId)
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
      .addCase(addNewProductData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewProductData.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addNewProductData.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getUserProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserProducts.fulfilled, (state, action) => {
        state.userProducts = action.payload
        state.isLoading = false
      })
      .addCase(getUserProducts.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload
        state.isLoading = false
      })
      .addCase(getProductById.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default productSlice.reducer
