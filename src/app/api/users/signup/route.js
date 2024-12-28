import { NextResponse } from "next/server";
import User from "@/models/User/userModel";
import bcryptjs from "bcryptjs";
import connectDb from "@/dbConfig/dbConfig";

connectDb();

export const POST = async (request) => {
  try {
    let reqBody = await request.json();

    let { userName, password, email } = reqBody;

    //now hash the password :
    let salt = await bcryptjs.genSalt(10);
    let hashedPassword = await bcryptjs.hash(password, salt);

    //check if the user witht the email exists or not:
    var response = await User.findOne({ email });

    if (response) {
      return NextResponse.json({
        message: "User already exists",
        status: 500,
      });
    }

    const newUser = new User({
        userName,
        password:hashedPassword,
        email
    });

    const savedUser = await newUser.save();
    return NextResponse.json({
        message:"User created successfully",
        status:200,
        savedUser
    });

  } catch (error) {
    return NextResponse.json({
        message:error.message,
        status:400,
        error
    });
  }
};
