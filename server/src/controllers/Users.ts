import { RequestHandler } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";

interface SignUpBody {
    username?: string;
    passwordRaw?: string;
    email?: string;
}

export const register: RequestHandler = async (req, res, next) => {

    const { username, passwordRaw, email } = req.body as SignUpBody;

    try {
        if (!username || !passwordRaw || !email) {
            throw new Error("Missing fields");
        }

        const existingUserName = await UserModel.findOne({ username: username }).exec();
        if (existingUserName) {
            throw new Error("Username already exists. Please choose another one or login instead.");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();
        if (existingEmail) {
            throw new Error("A user with this email address already exists. Please login instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const user = await UserModel.create({ username, password: passwordHashed, email });

        res.status(201).json({ message: "User created successfully", user: user });

    }
    catch (error) {
        next(error);
    }
}