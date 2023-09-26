import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        address: [{ detail: { type: String }, for: { type: String } }],
        phoneNumber: [{ type: Number }],

    },
    {
        timestamps: true,

    }
);
// attachments
UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoApp");
};

// helper functions 
UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("user already exists");
    }
    return false;
};

UserSchema.statics.findByEmailAndPassword = async (email, password) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('user does not exist');
    //Compare Passwords
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) throw new Error('Invalid Credentials');

    return user;
};

UserSchema.pre('save', function (next) {                        // next indicates current process is finished now follow the next steps.
    const user = this;

    // password is modified
    if (!user.isModified('password')) return next();


    // generate bcrypt salt 
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        // hash the password

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            // assigning hashed password
            user.password = hash;
            return next();
        });
    });
});




export const UserModel = mongoose.model("users", UserSchema);