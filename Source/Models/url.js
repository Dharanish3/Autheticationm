import mongoose from "./setup.js";


const urlSchema = new mongoose.Schema(
  {
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true
      
    },
    clicks: {
      type: Number,
   
      default: 0,
    },
  },
  {
    collection: "url",
  }
);

const schema = mongoose.model("url", urlSchema);

export default schema;
