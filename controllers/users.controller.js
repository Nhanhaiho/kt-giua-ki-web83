import {
  createUser,
  getAllUser,
  getOneUser,
  findOneUser,
} from "../models/users.models";
import { createToken } from "../models/token.models.js";
// token ma hoa cac kieu
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// lay tat ca nhung nguoi
export const getAllUserData = async (req, res) => {
  try {
    const allUsers = await getAllUser();
    res.status(200).send({
      users: allUsers,
      total: allUsers.length,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

// lay 1 user

export const getOneUserData = async (req, res) => {
  try {
    const { user_id } = req.params;
    const findUser = await getOneUser({ user_id });
    if (!findUser) {
      throw new Error("user ko tim thay");
    }
    res.status(200).send({
      user: findUser,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

// update user
export const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params
        const { password } = req.body
        const currentUser = await getOneUser(user_id);
        if (!currentUser) {
            throw new Error('user ko ton tai')
        }
        // doi mk --> save lai
        currentUser.password = password;
        await currentUser.save();
        res.status(200).send({
            message: 'update thanh cong',
            data: currentUser
        })
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};


// dang ki ng dung moi
export const register = async (req, res) => {
    try {
        const { username, password } = req.body
        const findUser = await findOneUser({ username });
        if (findUser) {
            throw new Error('hinh như có người lấy tên này rồi !!!')
        }
        // mã hóa, cái này e dùng gpt :V
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const createdUser = await createUser({ username, password: hashPassword })
        if (createdUser) {
            res.status(200).send({
                message: 'tao thanh cong ng dung moi :V'
            })
        }
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

// dang nhap
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await findOneUser({ username })
        if (!user) {
            throw new Error('ko thay user de ma gan nhap')
        }
        // so sanh password
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword) {
            throw new Error('hình như 1 trong 2 cái bạn nhập bị sai =)))')
        }
        // tao token
        const {id}= user
        const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY);
        await createToken({ token })
        res.status(200).send({ token})
    } catch (error) {
        res.send({
            message: error.message
        })
    }
}