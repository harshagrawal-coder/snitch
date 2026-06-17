import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    isGoogleUser: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      select: false,
      required: function () {
        return !this.isGoogleUser;
      },
    },

    contact: {
      type: String,
      required: function () {
        return !this.isGoogleUser;
      },
    },

    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);


});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const usermodel = mongoose.model("User", userSchema);

export default usermodel;