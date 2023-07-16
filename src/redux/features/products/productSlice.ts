import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  genre: string;
  publicationYear: number;
}


const initialState: IProduct = {
  genre: '',
  publicationYear: 2023,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setPublicationYear: (state, action: PayloadAction<number>) => {
      state.publicationYear = action.payload;
    },
  },
});

export const { setGenre, setPublicationYear } = productSlice.actions;

export default productSlice.reducer;
