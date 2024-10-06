import { deleteToken, findOneToken } from "../models/token.models.js";

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const findToken = await findOneToken({ token });
    if (!findToken) {
      throw new Error("token not access");
    }
    await deleteToken({ token });
    res.status(200).send({
      message: "xoa thanh cong",
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};
