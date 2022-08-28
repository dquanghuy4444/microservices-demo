import { ENUM_TEMPLATE_TYPE, ENUM_TEMPLATE_CODE } from './template.type';
import { Schema, Document, model } from 'mongoose';
export const DOCUMENT_NAME = 'Template';
export const COLLECTION_NAME = 'templates';

export default interface Template extends Document {
    type: ENUM_TEMPLATE_TYPE;
    code: typeof ENUM_TEMPLATE_CODE;
    name: string
    description?: string;
    title: string;
    content: string;
}

const TemplateSchema = new Schema(
    {
        type: {
            type: Number,
            enum: ENUM_TEMPLATE_TYPE,
            required: true,
            index: true
        },
        code: {
            type: String,
            enum: ENUM_TEMPLATE_CODE,
            index: true,
            required: true,
            unique: true
        },
        name: {
            type: String,
            index: true
        },
        description: {
            type: String
        },
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

export const TemplateModel = model<Template>(
    DOCUMENT_NAME,
    TemplateSchema,
    COLLECTION_NAME
);
