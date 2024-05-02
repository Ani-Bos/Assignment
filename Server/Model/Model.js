import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    uniquetoken: {
      type: String,
      required:true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

export default User;
