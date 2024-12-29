import User from "@/models/User/userModel";
import connectDb from "@/dbConfig/dbConfig";
import { getTokenValue } from "@/helper/getTokenfromCookie";
import { NextResponse } from "next/server";
connectDb();

export const POST = async (request) => {
  try {
    const decodedData = await getTokenValue(); // Decode token to get user ID
    const reqBody = await request.json(); // Parse request body
    const { task } = reqBody; // Extract task from request
    const _id = decodedData._id; // Get user ID from token

    // Find user by ID and append the task to the Notes array
    const user = await User.findByIdAndUpdate(
      _id,
      { $push: { Notes: task } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Task added successfully",
      status: 200,
      user, // Return the updated user document (optional)
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
};
