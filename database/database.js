const mongoose = require("mongoose");

// Database connection function
const connectDB = async () => {
  if ("DATABASE" in process.env) {
    try {
      await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB connected successfully");
    } catch (error) {
      console.log("DB connection error:", error);
    }
  } else {
    console.log("DATABASE environment variable not found");
  }
};

// Define the schemas
const movieSchema = new mongoose.Schema(
  {
    title: String,
    teaser: String,
    img: String,
    IMDB_rating: String,
    genre: [String],
    links: Object,
    devL: {
      type: String,
      select: false,
    },
  },
  { versionKey: false }
);

const statSchema = new mongoose.Schema(
  {
    serverCount: Number,
    userCount: Number,
    queries: Number,
  },
  { versionKey: false }
);

const userSchema = new mongoose.Schema(
  {
    userId: Number,
  },
  { versionKey: false }
);

// Create the models
const User = mongoose.model("User", userSchema);
const Stat = mongoose.model("Stat", statSchema);
const Movie = mongoose.model("Movie", movieSchema);

// Export the models and connection function
module.exports = {
  User,
  Stat,
  Movie,
  connectDB,
};
