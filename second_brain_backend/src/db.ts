import "dotenv/config";
import mongoose, { model, Schema } from "mongoose";

mongoose.connect(process.env.MONGO_DB_URL!);

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const ContentSchema = new Schema({
  title: String,
  link: String,
  type: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", require: true },
});

const LinkSchema = new Schema({
  hash: String,
  userId: {type: mongoose.Types.ObjectId, ref: "User", require: true, unique: true},
});

export const ContentModel = model("Content", ContentSchema);
export const UserModel = model("User", UserSchema);
export const LinkModel = model("Link", LinkSchema);
