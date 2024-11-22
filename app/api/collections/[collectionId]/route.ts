import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
// import mongoose from "mongoose";



export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }
) => {
    try {
        await connectToDB();
        const collection = Collection.findById(params.collectionId);

        // const { collectionId } = params; // Access params directly

        if (!collection) {
            return new NextResponse(
            JSON.stringify({ error: "Collection not found" }),
            { status: 404 });
        }

        return NextResponse.json(collection, {status: 200});
        } catch (error) {
        console.log("[collectionId_GET]", error);
        return new NextResponse(JSON.stringify({ message: "Internal error" }), { status: 500 });
    }
};

// export const POST = async (req: NextRequest, {params}: {params : {collectionId: string}}) => {
//     try {
//         const {userId} = auth()

//         if (!userId){
//             return new NextResponse("Unauthorized", {status: 401})
//         }

//         await connectToDB()

//         let collection = await Collection.findById(params.collectionId)

//         if (!collection) {
//             return new NextResponse("Collection not found", {status: 404})
//         }

//         const { title, description, image} = await req.json()

//         if (!title || !image){
//             return new NextResponse("Title and Image are required", { status: 400})
//         }

//         collection = await collection.findByIdAndUpdate(params.collectionId, {title, description, image}, {new: true})
//         await collection.save()

//         return NextResponse.json(collection, {status: 200})

//     } catch (error) {
//         console.log("[collectionId_POST]", error)
//         // return new NextResponse("internal error", { status: 500})
//         return new NextResponse(JSON.stringify({ message: "internal error" }), { status: 500 });

//     }
// }

export const POST = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
  ) => {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      await connectToDB();
  
      let collection = await Collection.findById(params.collectionId);
  
      if (!collection) {
        return new NextResponse("Collection not found", { status: 404 });
      }
  
      const { title, description, image } = await req.json();
  
      if (!title || !image) {
        return new NextResponse("Title and image are required", { status: 400 });
      }
  
      collection = await Collection.findByIdAndUpdate(
        params.collectionId,
        { title, description, image },
        { new: true }
      );
  
      await collection.save();
  
      return NextResponse.json(collection, { status: 200 });
    } catch (err) {
      console.log("[collectionId_POST]", err);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  
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
