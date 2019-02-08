import { Model, model } from "mongoose";
import { UserDocument } from "./document";
import { userSchema } from "./schema";


export const User: Model<UserDocument> = model("users", userSchema);


