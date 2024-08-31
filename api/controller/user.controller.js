import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";
export const test = (req, res) => {
  res.json({
    message: "Hello world this is api tut",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you are not authanticated to update profile"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avtar: req.body.avtar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
