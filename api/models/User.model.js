import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avtar: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
