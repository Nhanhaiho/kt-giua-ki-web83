import mongoose from "mongoose";
import ProfileSchema from "../utils/ProfileSchema.js";

const ProfileModel = mongoose.model("profiles", ProfileSchema)

// tao porfile
export const createProfile = (body) => {
    return ProfileModel.create(body);
}

export const findProfileByID = (id) => {
    return ProfileModel.findByID(id);
}

export const findProfile = (condition) => {
    return ProfileModel.findOne(condition);
}

export const updateProfile = (id, data) => {
    return ProfileModel.update(id, data);
}

export const deleteProfile = (filter) => {
    return ProfileModel.deleteOne(filter);
}