import { Router } from "express";

import { getProfile, createProfile, updateProfile, deleteProfile } from '../controllers/profiles.controller.js'

const profileRouter = Router()

profileRouter.get("/", getProfile);
profileRouter.post("/", createProfile);
profileRouter.put('/:profile_id',updateProfile)
profileRouter.delete('/:profile_id',deleteProfile);

export default profileRouter