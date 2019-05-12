import { Model, model } from 'mongoose';
import { SessionDocument } from './session.document';
import { sessionSchema } from './session.schema';

export const Session: Model<SessionDocument> = model('sessions', sessionSchema);
