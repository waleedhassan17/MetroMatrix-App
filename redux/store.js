import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import wishlistReducer from './slice/wishlistSlice';
import cartReducer from './slice/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default store;
