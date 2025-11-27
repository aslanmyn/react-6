import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchItems, getItemById } from "../../services/itemsService";


export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async (query, thunkAPI) => {
        try {

            const items = await searchItems(query);
            return items;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Error loading items");
        }
    }
);


export const fetchItemById = createAsyncThunk(
    "items/fetchItemById",
    async (id, thunkAPI) => {
        try {

            const item = await getItemById(id);
            return item;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Error loading item");
        }
    }
);

const initialState = {
    list: [],
    selectedItem: null,
    loadingList: false,
    loadingItem: false,
    errorList: null,
    errorItem: null,
    query: "",
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        clearSelectedItem(state) {
            state.selectedItem = null;
            state.errorItem = null;
            state.loadingItem = false;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchItems.pending, (state, action) => {
                state.loadingList = true;
                state.errorList = null;
                state.query = action.meta.arg || "";
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loadingList = false;
                state.list = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList =
                    action.payload || action.error.message || "Error loading items";
            })


            .addCase(fetchItemById.pending, (state) => {
                state.loadingItem = true;
                state.errorItem = null;
                state.selectedItem = null;
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.loadingItem = false;
                state.selectedItem = action.payload;
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                state.loadingItem = false;
                state.errorItem =
                    action.payload || action.error.message || "Error loading item";
            });
    },
});

export const { clearSelectedItem } = itemsSlice.actions;

export default itemsSlice.reducer;
