import mongoose from "mongoose";
import tokenSchema from "../utils/tokenSchema.js"

const tokenModel = mongoose.model("token_model", tokenSchema);

export const createToken = (token) => {
    return tokenModel.create(token);
}

export const deleteToken = (condition) => {
    return tokenSchema.delete(condition)
}

export default findOneToken = (condition) => {
  return tokenSchema.findOne(condition);
};