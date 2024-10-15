import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { Collection } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 403})
        }
        await connectToDB()

        const {title, description, image} = await req.json()

        const existingCollection = await Collection.findOne({title})

        if (existingCollection) {
            return new NextResponse("Collection already exists", {status: 400})
        }

        if (!title || !image) {
            return new NextResponse("Title and image are required", {status: 400})
        }

        const newCollection = await Collection.create({
            title,
            description,
            image,
        })
    } catch (error) {
        console.log("[collections_POST]", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}