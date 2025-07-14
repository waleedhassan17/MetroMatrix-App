import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem: (state, action) => {
      const item = action.payload;
      const index = state.items.findIndex(i => i.id === item.id);
      if (index >= 0) {
        state.items.splice(index, 1); // remove
      } else {
        state.items.push(item); // add
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { toggleWishlistItem, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
