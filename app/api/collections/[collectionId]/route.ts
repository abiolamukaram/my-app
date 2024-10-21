
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { connectToDB } from "@/lib/mongoDB";
// import  Collection  from "@/lib/models/Collection";


// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const GET = async (req:NextRequest, {params} : {params: {collectionId: string}}) => {
//     try {
//         const {userId} = auth()

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401})
//         }

//         await connectToDB()
        
//         await Collection.findByIdAndDelete(params.collectionId)
//         return new NextResponse("Collection deleted", { status: 200 })
//     } catch (error) {
//         console.log("[collectionId_DELETE]", error)
//         return new NextResponse("internal error", { status: 500})
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import mongoose from "mongoose";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const GET = async (req: NextRequest, {params}: {params: { collectionId: string}}) => {
//     try {
//         await connectToDB()

//         // const collection = await Collection.findById(params.collectionId)
//         const { collectionId } = req.params;

//         // if (!collection)
//         // {
//         //     return new NextResponse(JSON.stringify({message: "collection not found"}), {status: 404})
//         // }
//         if (!mongoose.Types.ObjectId.isValid(collectionId)) {
//             return new NextResponse(JSON.stringify({ error: "Invalid collectionId" }), {status: 400});
//         }

//         if (!collectionId) {
//             // return res.status(400).json({ error: "Missing collectionId" });
//             return new NextResponse(JSON.stringify({ error: "Missing collectionId"  }), {status: 400});
//         }

//         return NextResponse.json(collectionId, {status: 200})
//     } catch (error) {
//         console.log("[collectionId_GET]", error)
//         // return new NextResponse("internal error", {status: 500})
//         return new NextResponse(JSON.stringify({ message: "internal error" }), { status: 500 });

//     }
// }

export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        await connectToDB();

        const { collectionId } = params; // Access params directly

        if (!collectionId) {
            return new NextResponse(JSON.stringify({ error: "Missing collectionId" }), { status: 400 });
        }

        if (!mongoose.Types.ObjectId.isValid(collectionId)) {
            return new NextResponse(JSON.stringify({ error: "Invalid collectionId" }), { status: 400 });
        }

        // const collection = await Collection.findById(collectionId);

        // if (!collection) {
        //     return new NextResponse(JSON.stringify({ message: "Collection not found" }), { status: 404 });
        // }

        return new NextResponse(JSON.stringify({ collectionId }), { status: 200 });
    } catch (error) {
        console.log("[collectionId_GET]", error);
        return new NextResponse(JSON.stringify({ message: "Internal error" }), { status: 500 });
    }
};

export const POST = async (req: NextRequest, {params}: {params : {collectionId: string}}) => {
    try {
        const {userId} = auth()

        if (!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        await connectToDB()

        let collection = await Collection.findById(params.collectionId)

        if (!collection) {
            return new NextResponse("Collection not found", {status: 404})
        }

        const { title, description, image} = await req.json()

        if (!title || !image){
            return new NextResponse("Title and Image are required", { status: 400})
        }

        collection = await collection.findByIdAndUpdate(params.collectionId, {title, description, image}, {new: true})
        await collection.save()

        return NextResponse.json(collection, {status: 200})

    } catch (error) {
        console.log("[collectionId_POST]", error)
        // return new NextResponse("internal error", { status: 500})
        return new NextResponse(JSON.stringify({ message: "internal error" }), { status: 500 });

    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();

        const deletedCollection = await Collection.findByIdAndDelete(params.collectionId);
        if (!deletedCollection) {
            return new NextResponse("Collection not found", { status: 404 });
        }

        return new NextResponse("Collection deleted", { status: 200 });
    } catch (error) {
        console.error("[collectionId_DELETE]", error);
        // return new NextResponse("internal server error", { status: 500 });
        return new NextResponse(JSON.stringify({ message: "internal error" }), { status: 500 });
    }
};
