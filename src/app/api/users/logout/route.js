import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const GET = async() =>{
    try {
        let cookieStore = await cookies();
       let response = cookieStore.delete('token');
       if(response){
        return NextResponse.json({
            message:"Logged out successfully",
            status:200
        })
       }
    } catch (error) {
        return NextResponse.json({
            message:error.message,
            status:500
        })
    }
}