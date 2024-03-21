import { RequestHandler } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserID = req.session.userId;

    try {
        if (!authenticatedUserID) {
            throw createHttpError(401, "User not authenticated");
        }

        const user = await UserModel.findById(authenticatedUserID).select("+email").exec();

        res.status(200).json({ user: user });
    }
    catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string;
    passwordRaw?: string;
    email?: string;
};

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

        req.session.userId = user._id;

        res.status(201).json({ message: "User created successfully", user: user });

    }
    catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string;
    passwordRaw?: string;
};

export const login: RequestHandler = async (req, res, next) => {
    
    const { username, passwordRaw } = req.body as LoginBody;

    try {
        if (!username || !passwordRaw) {
            throw new Error("Missing fields");
        }

        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(passwordRaw, user.password);

        if (!passwordMatch) {
            throw new Error("Incorrect password");
        }

        req.session.userId = user._id;

        res.status(201).json({ message: "Login successful", user: user });

    }
    catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = async (req, res, next) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                next(error);
            }
            else {
                res.status(200).json({ message: "Logout successful" });
            }
        });
    }
    catch (error) {
        next(error);
    }
};