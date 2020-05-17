import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const MyProduct = new Schema(
  {
    url: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    desiredPrice: { type: Number },
    authorId: { type: ObjectId, ref: "User", required: true, immutable: true },
  },
  { timestamps: true }
);

export default MyProduct;
