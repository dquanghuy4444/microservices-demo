import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { ENUM_ROLE_CODE } from '../const/role';
import { ENUM_GENDER } from '../const/user';
import { CONFIG_ENV_SALT } from '../configs/env';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User extends Document {
    email: string;
    username: string;
    password: string;
    phone_number?: string;
    first_name: string;
    last_name: string;
    fullname: string /* Just for searching */;
    gender?: ENUM_GENDER;
    date_of_birth?: Date;
    skype_account?: string;
    address?: string;
    avatar: string;
    intro?: string;
    roles: ENUM_ROLE_CODE[];
    is_active?: boolean;
    is_verified_phone?: boolean;
    is_verified_email?: boolean;
    is_password_null?: boolean;
    regular_times?: number[];
    login_counter?: number;
    last_login_ip?: string;
    last_login?: Date;
    country?: string;
    currency?: string;
    timezone?: string;
    ispeak_user_id?: number;
    comparePassword(candidatePassword: string): Promise<boolean>;

}


const UserSchema = new Schema(
    {
        email: {
            type: String,
            index: true,
            required: false,
            trim: true
        },
        username: {
            type: String,
            unique: true,
            index: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        phone_number: {
            type: String,
            default: ''
        },
        first_name: {
            type: String,
            default: ''
        },
        last_name: {
            type: String,
            default: ''
        },
        full_name: {
            type: String,
            default: ''
        },
        gender: {
            type: Number,
            enum: ENUM_GENDER, //0: other, 1: male, 2: female
            default: 0
        },
        date_of_birth: {
            type: Date
        },
        skype_account: {
            type: String,
            index: true
        },
        address: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: ''
        },
        intro: {
            type: String,
            default: ''
        },
        role: [
            {
                type: Number,
                default: ENUM_ROLE_CODE.STUDENT,
                required: true,
                index: true
            }
        ],
        is_active: {
            type: Boolean,
            required: true,
            index: true,
            default: false
        },
        is_verified_phone: {
            type: Boolean,
            required: true,
            default: false
        },
        is_verified_email: {
            type: Boolean,
            required: true,
            default: false
        },
        is_password_null: {
            type: Boolean,
            default: false
        },
        regular_times: {
            type: [
                {
                    type: Number
                }
            ],
            default: []
        },
        login_counter: {
            type: Number,
            required: true,
            default: 0
        },
        last_login_ip: {
            type: String
        },
        last_login: {
            type: Date,
            index: true
        },
        country: {
            type: String,
            default: ''
        },
        currency: {
            type: String,
            default: ''
        },
        timezone: {
            type: String,
            default: ''
        },
        bank_account: {
            type: Schema.Types.Mixed
        },
        ispeak_user_id: {
            type: Number
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

UserSchema.index({
    email: 'text',
    username: 'text',
    phone_number: 'text',
    full_name: 'text',
    skype_account: 'text'
});

UserSchema.pre<User>('save', function (next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(CONFIG_ENV_SALT, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// @ts-ignore
UserSchema.methods.comparePassword = function (
    this: User,
    candidatePassword: string
) {
    return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<User>(
    DOCUMENT_NAME,
    UserSchema,
    COLLECTION_NAME
);
