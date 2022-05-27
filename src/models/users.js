const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name required"]
        },
        lastName: {
            type: String,
            required: [true, "Last name required"]
        },
        email: {
            type: String,
            required: [true, "Email required"],
            unique: true,
            index: true
        },
        password: {
            type: String,
            required: [true, "Password required"]
        },
        role: {
            type: String,
            required: true,
            default: "USER",
            enum: ["USER", "ADMIN"]
        },
        enable: {
            type: Boolean,
            required: true,
            default: true
        },
        birthdate: {
            type: Date,
        }
    },
    { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {message: "already exist in the DB"});
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchema);
