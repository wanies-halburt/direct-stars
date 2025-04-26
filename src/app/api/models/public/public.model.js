import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PublicSchema = new mongoose.Schema(
  {
    email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please Include your password"],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    gender: {
    type: String,
    required: true,
  },
  },
  { timestamps: true }
);

const MAX_TOKENS = 3;

PublicSchema.pre("save", async function (next) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (err) {
    next(err);
  }
});

PublicSchema.methods.generateAuthToken = async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  let options = {};

  // Set token to expire in 1 hour in production mode
  if (process.env.NODE_ENV !== "development") {
    options.expiresIn = "1h";
  } else {
    options.expiresIn = "5d";
  }

  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
    },
    "public_secret",
    options
  );
  user.tokens = user.tokens.concat({ token });
  if (user.tokens.length > MAX_TOKENS) {
    user.tokens = user.tokens.slice(user.tokens.length - MAX_TOKENS);
  }
  await user.save();

  return token;
};

PublicSchema.statics.findByCredentials = async (email, password) => {
  const user = await Public.findOne({ email });

  if (!user) {
    return false;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return false;
  }
  return user;
};
const Public = mongoose.models.public || mongoose.model("public", PublicSchema);

export default Public;
