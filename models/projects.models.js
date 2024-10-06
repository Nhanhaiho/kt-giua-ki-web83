import mongoose from "mongoose";
import ProjectSchema from "../utils/ProjectSchema.js";

const ProjectModel = mongoose.model("projects", ProjectSchema);

// them vao nhieu project
export const createProject = (body) => {
  return ProjectModel.insertMany(body);
};

export const createOneProject = (body) => {
  return ProjectModel.create(body);
};

export const updateProject = (id, data) => {
  return ProjectModel.updateOne(id, data);
};

export const findProject = (condition) => {
  return ProjectModel.find(condition);
};
export const deleteProject = (filter) => {
  return ProjectModel.deleteMany(filter);
};
