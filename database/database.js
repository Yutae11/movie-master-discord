const mongoose = require('mongoose');

// Database connection function
const connectDB = async () => {
  if ('DATABASE' in process.env) {
    try {
      await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('DB connected successfully');
    } catch (error) {
      console.log('DB connection error:', error);
    }
  } else {
    console.log('DATABASE environment variable not found');
  }
};

// Define a schema with an ObjectId field
const userSchema = new mongoose.Schema(
  {
    name: String,
    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false }
);

// Pre-save middleware to validate ObjectId
userSchema.pre('save', function (next) {
  const value = this.friend;

  if (!mongoose.Types.ObjectId.isValid(value)) {
    // Creating a new CastError
    const CastError = mongoose.Error.CastError;
    const error = new CastError('ObjectId', value, 'friend', new Error('Invalid ObjectId'), this);
    return next(error);
  }
  
  next();
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model and connection function
module.exports = {
  User,
  connectDB,
};
