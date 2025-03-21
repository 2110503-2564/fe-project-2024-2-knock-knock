import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const newBooking = action.payload;
      const index = state.bookItems.findIndex(
        (item) =>
          item.hotel === newBooking.hotel &&
          item.bookingDate === newBooking.bookingDate
      );
      if (index !== -1) {
        state.bookItems[index] = newBooking;
      } else {
        state.bookItems.push(newBooking);
      }
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      const remainItems = state.bookItems.filter((obj) => {
        return (
          obj.nameLastname !== action.payload.nameLastname ||
          obj.tel !== action.payload.tel ||
          obj.hotel !== action.payload.hotel ||
          obj.bookingDate !== action.payload.bookingDate
        );
      });
      state.bookItems = remainItems;
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
