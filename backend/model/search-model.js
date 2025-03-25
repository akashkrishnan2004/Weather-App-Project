import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
  city: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Search = mongoose.model("Search", searchSchema);
export default Search;

// import mongoose from "mongoose";

// const searchSchema = new mongoose.Schema({
//   city: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now }
// });

// export default mongoose.model("Search", searchSchema);
