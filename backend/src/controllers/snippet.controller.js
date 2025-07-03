import { asyncHandler } from "../utils/asyncHandler.js";
import { Snippet } from "../models/snippet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createSnippet = asyncHandler(async (req, res) => {
  
  const { title, description, code, language, tags } = req.body;
  
  
  const owner = req.user._id;

  
  if (!title || !code) {
    throw new ApiError(400, "Title and code are required");
  }

  
  const snippet = await Snippet.create({
    title,
    description: description || "",
    code,
    language: language || "",
    tags: tags || [],
    owner
  });

  
  return res.status(201).json(
    new ApiResponse(201, snippet, "Snippet created successfully")
  );
});


const getUserSnippets = asyncHandler(async (req, res) => {
  const owner = req.user._id;
  const { title } = req.query;
  
  const query = { owner };
  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }

  const snippets = await Snippet.find(query).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, snippets, "Snippets retrieved successfully")
  );
});



const getSnippetById = asyncHandler(async (req, res) => {
  
  const snippetId = req.params.id;
  const owner = req.user._id;

  
  const snippet = await Snippet.findOne({ _id: snippetId, owner });
  
  
  if (!snippet) {
    throw new ApiError(404, "Snippet not found");
  }

  
  return res.status(200).json(
    new ApiResponse(200, snippet, "Snippet retrieved")
  );
});


const updateSnippet = asyncHandler(async (req, res) => {
  
  const snippetId = req.params.id;
  const owner = req.user._id;
  const updateData = req.body;

  
  if (updateData.owner) {
    throw new ApiError(400, "Cannot change snippet owner");
  }

  
  const updatedSnippet = await Snippet.findOneAndUpdate(
    { _id: snippetId, owner },
    updateData,
    { new: true } 
  );

  
  if (!updatedSnippet) {
    throw new ApiError(404, "Snippet not found");
  }

  
  return res.status(200).json(
    new ApiResponse(200, updatedSnippet, "Snippet updated")
  );
});


const deleteSnippet = asyncHandler(async (req, res) => {
  
  const snippetId = req.params.id;
  const owner = req.user._id;

  
  const deletedSnippet = await Snippet.findOneAndDelete({ _id: snippetId, owner });
  
  
  if (!deletedSnippet) {
    throw new ApiError(404, "Snippet not found");
  }

  
  return res.status(200).json(
    new ApiResponse(200, {}, "Snippet deleted successfully")
  );
});

export {
  createSnippet,
  getUserSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet
};