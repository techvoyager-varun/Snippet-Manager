import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
{
  username:
  {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  email:
  {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password:
  {
    type: String,
    required: true,
  },
  refreshToken:
  {
    type: String,
  },
},
{
  timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function(next)
{
  if (!this.isModified('password')) return next();

  try
  {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
  catch (error)
  {
    next(error);
  }
});

// Password comparison method
userSchema.methods.isPasswordCorrect = async function(password)
{
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
