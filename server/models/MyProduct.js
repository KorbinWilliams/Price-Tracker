import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let Decimal = Schema.Types.Decimal128;

const MyProduct = new Schema(
  {
    url: { type: String, required: true },
    productLink: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    originalPrice: { type: Decimal, required: true },
    desiredPrice: { type: Decimal, default: 0 },
    currentPrice: { type: Decimal, default: 0 },
    authorId: { type: ObjectId, ref: "User", required: true, immutable: true },
  },
  { timestamps: true }
);

export default MyProduct;
