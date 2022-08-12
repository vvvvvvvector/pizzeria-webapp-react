import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        selectedCategoryIndex: 0,
        selectedCategoryName: "All",
        selectedSortParameterIndex: 0,
        currentPage: 1,
        searchValue: ""
    },
    reducers: {
        setCategoryIndex(state, action) {
            state.selectedCategoryIndex = action.payload;
        },
        setCategoryName(state, action) {
            state.selectedCategoryName = action.payload;
        },
        setSortParameter(state, action) {
            state.selectedSortParameterIndex = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setPageParameters(state, action) {
            state.selectedCategoryIndex = Number(action.payload.category);
            state.selectedCategoryName = action.payload.categoryName;
            state.selectedSortParameterIndex = Number(action.payload.sort);
            state.currentPage = Number(action.payload.page);
        }
    }
});

export const {
    setCategoryIndex,
    setCategoryName,
    setSortParameter,
    setCurrentPage,
    setSearchValue,
    setPageParameters
} = filterSlice.actions;

export default filterSlice.reducer;