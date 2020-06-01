import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let Decimal = Schema.Types.Decimal128;

const MyProduct = new Schema(
  {
    url: { type: String, required: true },
    price: { type: Decimal, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    desiredPrice: { type: Decimal, default: 0 },
    authorId: { type: ObjectId, ref: "User", required: true, immutable: true },
  },
  { timestamps: true }
);

export default MyProduct;
