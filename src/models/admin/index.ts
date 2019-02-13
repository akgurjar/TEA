import { Model, model } from 'mongoose';
import { AdminDocument } from './admin.document';
import { adminSchema } from './admin.schema';

export const Admin: Model<AdminDocument> = model('admins', adminSchema);
