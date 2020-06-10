import mongoose from "mongoose";
import MyProduct from "../models/MyProduct";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("MyProduct", MyProduct);

class MyProductService {
  async delete(uid, id) {
    await _repository.findByIdAndRemove({ authorId: uid, _id: id });
  }
  async getAll(uid) {
    let data = await _repository.find({ authorId: uid });
    return data;
  }

  async getMyProductByUserId(userId, uid) {
    let data = await _repository.findOne({ userId, authorId: uid });
    return data;
  }

  async create(body) {
    let data = await _repository.create(body);
    return data;
  }

  // async getById(id) {
  //   let data = await _repository.findOne({ _id: id });
  //   if (!data) {
  //     throw new ApiError("Invalid ID", 400);
  //   }
  //   return data;
  // }

  async edit(id, update, userId) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this myProduct", 400);
    }
    return data;
  }
}

const _myProductService = new MyProductService();
export default _myProductService;
