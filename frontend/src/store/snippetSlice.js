import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snippets: [],
  currentSnippet: null
};

const snippetSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    
    getSnippetsSuccess(state, action) {
      state.snippets = action.payload;
    },

    
    getSnippetSuccess(state, action) {
      state.currentSnippet = action.payload;
    },

    
    saveSnippetSuccess(state, action) {
      const existingIndex = state.snippets.findIndex(
        (snippet) => snippet._id === action.payload._id
      );

      if (existingIndex !== -1) {
        state.snippets[existingIndex] = action.payload;
      } else {
        state.snippets.push(action.payload);
      }

      state.currentSnippet = action.payload;
    },

    
    deleteSnippetSuccess(state, action) {
      state.snippets = state.snippets.filter(
        (snippet) => snippet._id !== action.payload
      );
      state.currentSnippet = null;
    },

    
    clearCurrentSnippet(state) {
      state.currentSnippet = null;
    }
  }
});

export const {
  getSnippetsSuccess,
  getSnippetSuccess,
  saveSnippetSuccess,
  deleteSnippetSuccess,
  clearCurrentSnippet
} = snippetSlice.actions;

export default snippetSlice.reducer;
