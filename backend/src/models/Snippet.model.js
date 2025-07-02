import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema(
{
  title:
  {
    type: String,
    required: true,
    trim: true,
  },
  description:
  {
    type: String,
    trim: true,
  },
  code:
  {
    type: String,
    required: true,
  },
  language:
  {
    type: String,
    required: true,
    default: '',
  },
  tags:
  {
    type: [String],
    default: [],
  },
  owner:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{
  timestamps: true
});

export const Snippet = mongoose.model('Snippet', snippetSchema);
