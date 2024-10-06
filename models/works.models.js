import mongoose from "mongoose";
import WorkSchema from '../utils/WorkSchema.js'

const WorkModel = mongoose.model("works", WorkSchema);

// them vao nhieu work 
export const createWork = (body) => {
  return WorkModel.insertMany(body);
};

export const createOneWork = (body) => {
    return WorkModel.create(body);
}

export const updateWork = (id, data) => {
    return WorkModel.updateOne(id, data);
}

export const findWork = (condition) => {
    return WorkModel.find(condition);
}

export const deleteWork = (filter) => {
    return workModel.deleteMany(filter);
}