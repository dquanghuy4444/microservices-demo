import { Schema, Document, model } from 'mongoose';

import { DEFAULT_STUDENT_STARTING_LEVEL } from './student.type';
import User from '../user/user.model';

export const DOCUMENT_NAME = 'Student';
export const COLLECTION_NAME = 'students';

export default interface Student extends Document {
    user: User;
    student_level_id: number;
}

const StudentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    student_level_id: {
        type: Number,
        index: true,
        required: true,
        default: DEFAULT_STUDENT_STARTING_LEVEL
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const StudentModel = model<Student>(
    DOCUMENT_NAME,
    StudentSchema,
    COLLECTION_NAME
);
