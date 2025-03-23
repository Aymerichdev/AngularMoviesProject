import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userLevel: { 
    type: Number, 
    required: [true, 'userLevel is required'], 
    enum: {
      values: [0, 1],
      message: 'userLevel must be either 0 (normal user) or 1 (admin)'
    } 
  },
  mail: { 
    type: String, 
    required: [true, 'Email is required'], 
  },
  password: { 
    type: String, 
    required: [true, 'Password is required']
  },
});

export default mongoose.model('User', userSchema);
