import { configureStore } from '@reduxjs/toolkit';
import vendorSlice from '../slices/VendorSlice';

const store = configureStore({
  reducer: {
    vendor: vendorSlice,
  },
});

export default store;
