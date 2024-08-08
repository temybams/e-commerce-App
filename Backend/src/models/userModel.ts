import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import joi from 'joi';

interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

export const UserValidationSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error: any) {
        next(error);
    }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
