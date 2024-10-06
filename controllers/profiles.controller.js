// import cac chuc nang nhiu nhat co the :v
import {
  createProfile,
  findProfileByID,
  findProfile,
  updateProfile,
  deleteProfile,
} from "../models/profiles.models.js";

import {
  createProject,
  createOneProject,
  updateProject,
  findProject,
  deleteProject,
} from "../models/project.models.js";
import {
  createWork,
  createOneWork,
  updateWork,
  findWork,
  deleteWork,
} from "../models/works.models.js";
import { getOneUser } from "../models/user.models.js";

// lay profile
export const getProfile = async (req, res) => {
  try {
    const { user_id } = req.query;
    const profile = await findProfile({ user_id });
    if (!profile) {
      throw new Error("ko thay profile thế thôi :v");
    }
    const projects = await findProject({ profile_id });
    const works = await findWorks({ profile_id });
    res.status(200).send({
      ...profile,
      projects,
      works,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// crud :v

// create profile
export const createProfile = async (req, res) => {
  const { user_id } = req.query;
  const {
    full_name,
    birthday,
    place_of_birth,
    nationality,
    education,
    hobbies,
    goal,
    skill,
    projects,
    works,
  } = req.body;
  try {
    const findUser = await getOneUser(user_id);
    if (!findUser) {
      throw new Error("user hình như ko đúng :v");
    }
    const createdProfile = await createProfile({
      user_id,
      full_name,
      birthday,
      place_of_birth,
      nationality,
      education,
      hobbies,
      goal,
      skill,
    });
    // loc qua project de lay ra theo id profile
    projects.forEach((item) => {
      item.profile_id = createdProfile.profile_id;
    });
    const createdProjects = await createProject(projects);
    const createdWorks = await createWork(works);

    if (!createdProfile && !createdWorks && !createdProjects) {
      res.status(200).send({
        message: "tao thanh cong",
        data: {
          ...createdProfile,
          createdWorks,
          createdProjects,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// update profile
export const updateProfile = async (req, res) => {
  const { profile_id } = req.params;
  const { user_id } = req.query;
  const { projects, works, ...updateBody } = req.body;
  try {
    // tim profile hien tai
    const currentProfile = await findProfileByID(profile_id);
    if (!currentProfile) {
      throw new Error("profile kiem ko co :v");
    }
    // e quen cach lam update roi ạ
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// delete profile

export const deleteProfile = async (req, res) => {
  const { profile_id } = req.params;
  try {
    const currentProfile = await findProfileById(profile_id);
    if (!currentProfile) {
      throw new Error("pro kiem ko co");
    }
    await deleteProfile({ profile_id });
    await deleteProject({ profile_id });
    await deleteWork({ profile_id });
    res.status(200).send({
      message: "xoa thanh cong roi nha :v",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};
