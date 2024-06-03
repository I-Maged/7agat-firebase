import { configureStore } from '@reduxjs/toolkit'

import userAuthReducer from '../features/user/userSlice'
import productReducer from '../features/product/productSlice'
import offerReducer from '../features/offer/offerSlice'

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    products: productReducer,
    offers: offerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
