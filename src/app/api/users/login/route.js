import User from "@/models/User/userModel";
import bcryptjs from "bcryptjs";
import connectDb from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDb();

export const POST = async (request) => {
  try {
    let reqBody = await request.json();
    let { email, password } = reqBody;

    //check if the user exists :
    let user = await User.findOne({ email });
    if(!user){
        return NextResponse.json({
            message: "User does not exist",
            status: 500,
          });
    }

    let verified = await bcryptjs.compare(password,user.password);

    if(!verified){
        return NextResponse.json({
            message: "Enter correct credentials",
            status: 500,
          });
    }

    //if both are correct we are ready to create the token:
    let tokenData = {
        _id:user._id,
        email
    };

    let token = jwt.sign(tokenData,process.env.SECRET_KEY);

    //so save this token in cookie:
    let response = NextResponse.json({message:"User logged in successfully",user});

    response.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60, // 1 day in seconds
      });
      

    return response;

  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
};
