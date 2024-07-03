"use server";

import UserModel from "@/database/user.model";
import { connectToDB } from "../mongoose";
import {
    ICreateUserParams,
    IDeleteUserParams,
    IGetAllUsersParams,
    IUpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import QuestionModel from "@/database/question.model";

export async function getAllUsers(params: IGetAllUsersParams) {
    try {
        await connectToDB();

        // const { page = 1, pageSize = 10, filter, searchQuery } = params;

        const users = await UserModel.find({}).sort({ joinedAt: -1 });

        return { users };
    } catch (error) {
        console.error("unable to fetch users");
        throw error;
    }
}

export async function getUserById(params: any) {
    const { userId } = params;
    try {
        await connectToDB();

        const user = await UserModel.findOne({ clerkId: userId });

        if (!user) {
            throw new Error("User not found" + userId);
        }

        return user;
    } catch (error) {
        console.error("unable to find user with id", userId);
        throw error;
    }
}

export async function createUser(params: ICreateUserParams) {
    try {
        await connectToDB();

        const user = await UserModel.create(params);

        return user;
    } catch (error) {
        console.error("unable to create user");
        throw error;
    }
}

export async function updateUser(params: IUpdateUserParams) {
    try {
        await connectToDB();

        const { clerkId, payload, pathname } = params;

        await UserModel.findOneAndUpdate({ clerkId }, payload, { new: true });

        revalidatePath(pathname);
    } catch (error) {
        console.error("unable to create user");
        throw error;
    }
}

export async function deleteUser(params: IDeleteUserParams) {
    try {
        await connectToDB();

        const { clerkId } = params;

        const user = await UserModel.findOneAndDelete({ clerkId });

        if (!user) {
            throw new Error("User not found");
        }

        // delete questions
        /* const userQuestionIds = */ await QuestionModel.find({
            author: user._id,
        }).distinct("_id");

        await QuestionModel.deleteMany({ author: user._id });

        // TODO: delete user answers, comments

        const deletedUser = await UserModel.findByIdAndDelete(user._id);

        return deletedUser;
    } catch (error) {
        console.error("unable to create user");
        throw error;
    }
}
