import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Actor name is required'], 
    trim: true, 
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  birthDate: { 
    type: Date, 
    required: [true, 'Birth date is required'],
    validate: {
      validator: (value) => value <= new Date(),
      message: 'Birth date must be in the past'
    }
  },
  biography: { 
    type: String, 
    required: [true, 'Biography is required'], 
    minlength: [10, 'Biography must be at least 10 characters long'],
    maxlength: [2000, 'Biography cannot exceed 2000 characters']
  },
  imgLinks: [{ 
    type: String, 
    required: [true, 'Image link is required'],
  }]
});

const Actor = mongoose.model('Actor', actorSchema);

export default Actor;
