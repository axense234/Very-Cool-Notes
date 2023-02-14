import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
// AXIOS
import axios, { Axios, AxiosError } from "axios";
import axiosInstance from "../../utils/axios";
// REDUX STORE
import { State } from "../api/store";
// TS
import { CategoryType, CategoryResponsePayload } from "../../types";

const categoriesAdapter = createEntityAdapter<CategoryType>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

type initialStateType = {
  loadingCategories: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCategory: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
};

const initialState = {
  loadingCategories: "IDLE", // "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCategory: "IDLE", // "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
} as EntityState<CategoryType> & initialStateType;

// THUNKS
export const getAllCategories = createAsyncThunk<
  CategoryResponsePayload | AxiosError
>("categories/getAllCategories", async (state, action) => {
  try {
    const { data } = await axiosInstance.get("/categories");
    return data as CategoryResponsePayload;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getCategoryByName = createAsyncThunk<
  CategoryResponsePayload | AxiosError,
  string
>("categoires/getCategoryByName", async (name) => {
  try {
    const { data } = await axiosInstance.get(`categoires/${name}`);
    return data as CategoryResponsePayload;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteCategoryByName = createAsyncThunk<
  CategoryResponsePayload | AxiosError,
  string
>("categories/deleteCategoryByName", async (name) => {
  try {
    const { data } = await axiosInstance.delete(`categories/delete/${name}`);
    return data as CategoryResponsePayload;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateCategoryByName = createAsyncThunk<
  CategoryResponsePayload | AxiosError,
  CategoryType
>("categories/updateCategoryByName", async (mutableBody) => {
  try {
    const { data } = await axiosInstance.patch(
      `/categories/update/${mutableBody.name}`
    );
    return data as CategoryResponsePayload;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const createCategory = createAsyncThunk<
  CategoryResponsePayload | AxiosError,
  CategoryType
>("categories/createCategory", async (mutableBody) => {
  try {
    const { data } = await axiosInstance.post(
      `/categories/create`,
      mutableBody
    );
    return data as CategoryResponsePayload;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCategories.pending, (state, action) => {
        categoriesAdapter.removeAll(state);
        state.loadingCategories = "PENDING";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        const { categories } = action.payload as CategoryResponsePayload;
        categoriesAdapter.upsertMany(state, categories as CategoryType[]);
        state.loadingCategories = "SUCCEDED";
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        categoriesAdapter.removeAll(state);
        state.loadingCategories = "FAILED";
      })
      .addCase(getCategoryByName.pending, (state, action) => {
        state.loadingCategory = "PENDING";
      })
      .addCase(getCategoryByName.fulfilled, (state, action) => {
        const { category } = action.payload as CategoryResponsePayload;
        categoriesAdapter.upsertOne(state, category as CategoryType);
        state.loadingCategory = "SUCCEDED";
      })
      .addCase(getCategoryByName.rejected, (state, action) => {
        state.loadingCategory = "FAILED";
      })
      .addCase(deleteCategoryByName.pending, (state, action) => {
        state.loadingCategory = "PENDING";
      })
      .addCase(deleteCategoryByName.fulfilled, (state, action) => {
        const { category } = action.payload as CategoryResponsePayload;
        const { category_uid } = category as CategoryType;
        categoriesAdapter.removeOne(state, category_uid);
        state.loadingCategory = "SUCCEDED";
      })
      .addCase(deleteCategoryByName.rejected, (state, action) => {
        state.loadingCategory = "FAILED";
      })
      .addCase(updateCategoryByName.pending, (state, action) => {
        state.loadingCategory = "PENDING";
      })
      .addCase(updateCategoryByName.fulfilled, (state, action) => {
        const { category } = action.payload as CategoryResponsePayload;
        categoriesAdapter.upsertOne(state, category as CategoryType);
        state.loadingCategory = "SUCCEDED";
      })
      .addCase(updateCategoryByName.rejected, (state, action) => {
        state.loadingCategory = "FAILED";
      })
      .addCase(createCategory.pending, (state, action) => {
        state.loadingCategory = "PENDING";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        const { category } = action.payload as CategoryResponsePayload;
        categoriesAdapter.addOne(state, category as CategoryType);
        state.loadingCategory = "SUCCEDED";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loadingCategory = "FAILED";
      });
  },
});

// SELECTORS
export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors((state: State) => state.categories);

// LOADING SELECTORS
export const selectLoadingCategories = (state: State) =>
  state.categories.loadingCategories;
export const selectLoadingCategory = (state: State) =>
  state.categories.loadingCategory;

// REDUCER
export default categoriesSlice.reducer;
