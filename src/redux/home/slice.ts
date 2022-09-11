import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IHomeState } from './types';

const initialState = {
    categoryIndex: 0,
    sortParameterIndex: 0,
    categoryName: "All",
    currentPage: 1,
    searchValue: ""
} as IHomeState;

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setCategoryIndex(state, action: PayloadAction<number>) {
            state.categoryIndex = action.payload;
            state.currentPage = 1;
        },
        setSortParameter(state, action: PayloadAction<number>) {
            state.sortParameterIndex = action.payload;
            state.currentPage = 1;
        },
        setCategoryName(state, action: PayloadAction<string>) {
            state.categoryName = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    }
});

export const {
    setCategoryIndex,
    setCategoryName,
    setSortParameter,
    setCurrentPage,
    setSearchValue
} = homeSlice.actions;

export default homeSlice.reducer;