import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Scraper = new Schema({
  url: { type: String, required: true }
}, { timestamps: true })



export default Scraper