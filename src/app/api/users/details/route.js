import { NextResponse } from 'next/server';
import { getTokenValue } from '@/helper/getTokenfromCookie';
import User from '@/models/User/userModel';
import connectDb from '@/dbConfig/dbConfig';
connectDb();

export const GET = async (request) => {
  try {
    const decodedData = await getTokenValue();

    let _id = decodedData._id

    let user = await User.findById(_id);

    return NextResponse.json({
        message:"User details fetched successfully",
        user
    })
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
};
