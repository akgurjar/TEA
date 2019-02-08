import { Model, model } from "mongoose";
import { AdminDocument } from "./document";
import { adminSchema } from "./schema";

export const Admin: Model<AdminDocument> = model("admins", adminSchema);
