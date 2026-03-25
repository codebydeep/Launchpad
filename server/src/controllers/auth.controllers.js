import User from "../models/user.model.js";

import asyncHandler from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax"
};

const registerUser = asyncHandler(async(req, res) => {
    const { 
        fullname,
        email,
        password
    } = req.body

    if(!fullname || !email || !password){
        throw new ApiError(
            400,
            "All the details! are required."
        )
    }
        
    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new ApiError(
            403,
            "User already exists!"
        )
    }
        
    const user = await User.create({
        fullname,
        email,
        password
    })


    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken

    await user.save({
        validateBeforeSave: true
    })

    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15
    })

    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24
    })

    res.status(201).json(
        new ApiResponse(
            201,
            "User Created Successfully!",
            { createdUser }
        )
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isMatched = await user.isPasswordMatched(password);

    if (!isMatched) {
        throw new ApiError(401, "Invalid credentials");
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loginUser = user.toObject();
    delete loginUser.password;
    delete loginUser.refreshToken;
    delete loginUser.emailVerificationToken;
    delete loginUser.emailVerificationTokenExpiry;

    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000
    });

    res.status(200).json(
        new ApiResponse(
            200,
            "User logged in successfully!",
            loginUser
        )
    );
});

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        {
            new: true,
        }
    )

    res.clearCookie("accessToken", cookieOptions)

    res.clearCookie("refreshToken", cookieOptions)

    res.status(200).json(
        new ApiResponse(
            200,
            "User LogOut Successfully!",
        )
    )
})

const getProfile = asyncHandler(async(req, res) => {

    res.status(200).json(
        new ApiResponse(
            200,
            "Profile fetched Successfully!",
            req.user
        )
    )
})

const changeRole = asyncHandler(async(req, res) => {
    const { id } = req.params
    const { newRole } = req.body

    const user = await User.findByIdAndUpdate(id, {
        role: newRole
    })

    await user.save();

    res.status(200).json(
        new ApiResponse(
            200,
            `User role changed to ${newRole}`,
        )
    )
})

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getProfile,
    changeRole 
}