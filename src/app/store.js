import { configureStore } from '@reduxjs/toolkit'

import userAuthReducer from '../features/user/userSlice'
import productReducer from '../features/product/productSlice'

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
