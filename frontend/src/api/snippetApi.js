import axiosInstance from './axios';

export const createSnippet = (snippetData) => {
  return axiosInstance.post('/snippets', snippetData);
};

export const getSnippets = (title) => {
  return axiosInstance.get('/snippets', { 
    params: { title } 
  });
};

export const getSnippetById = (snippetId) => {
  return axiosInstance.get(`/snippets/${snippetId}`);
};

export const updateSnippet = (snippetId, updateData) => {
  return axiosInstance.patch(`/snippets/${snippetId}`, updateData);
};

export const deleteSnippet = (snippetId) => {
  return axiosInstance.delete(`/snippets/${snippetId}`);
};