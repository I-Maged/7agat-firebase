import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import offerService from './offerService'
import { extractErrorMessage } from '../utils'

const initialState = {
  offers: null,
  checkOffer: null,
  isLoading: false,
}

export const addNewOffer = createAsyncThunk('offers/addNewOffer', async (offerData, thunkAPI) => {
  try {
    return await offerService.addNewOffer(offerData)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})
export const offerCheck = createAsyncThunk('offers/offerCheck', async (offerCheckData, thunkAPI) => {
  try {
    return await offerService.offerCheck(offerCheckData.productId, offerCheckData.userId)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})
export const getUserOffers = createAsyncThunk('offers/userOffers', async (userId, thunkAPI) => {
  try {
    return await offerService.getUserOffers(userId)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addNewOffer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewOffer.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addNewOffer.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(offerCheck.pending, (state) => {
        state.isLoading = true
      })
      .addCase(offerCheck.fulfilled, (state, action) => {
        state.checkOffer = action.payload
        state.isLoading = false
      })
      .addCase(offerCheck.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getUserOffers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserOffers.fulfilled, (state, action) => {
        state.offers = action.payload
        state.isLoading = false
      })
      .addCase(getUserOffers.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default offerSlice.reducer
