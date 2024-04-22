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

        res.status(200).json({ message: "returning authenticated user", user: user });
    }
    catch (error) {
        next(error);
    }
};

interface RegisterBody {
    username?: string;
    passwordRaw?: string;
    email?: string;
};

export const register: RequestHandler = async (req, res, next) => {

    const { username, passwordRaw, email } = req.body as RegisterBody;

    try {
        if (!username || !passwordRaw || !email) {
            throw createHttpError(400, "Missing fields");
        }

        const existingUserName = await UserModel.findOne({ username: username }).exec();
        if (existingUserName) {
            throw createHttpError(409, "A user with this username already exists. Please choose a different username.");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();
        if (existingEmail) {
            throw createHttpError(409, "A user with this email already exists. Please choose a different email.");
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
            throw createHttpError(400, "Missing fields");
        }

        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "User not found");
        }

        const passwordMatch = await bcrypt.compare(passwordRaw, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid password");
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

export const findById: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id).exec();

        if (!user) {
            throw createHttpError(404, "User not found");
        }

        res.status(200).json({ user: user });
    }
    catch (error) {
        next(error);
    }
};