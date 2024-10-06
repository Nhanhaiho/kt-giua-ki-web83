import mongoose from "mongoose";
import UserSchema from "../utils/UserSchema.js";

const UserModel = mongoose.model("users", UserSchema);

// tao ng dung
export const createUser = (body) => {
  return UserModel.create(body);
};

export const getAllUser = () => {
  return UserModel.find();
};

export const getOneUser = (id) => {
  return UserModel.findById(id);
};

export const findOneUser = (condition) => {
  return UserModel.findOne(condition);
};
