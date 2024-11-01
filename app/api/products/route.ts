import { auth } from "@clerk/nextjs/server";
// import { useAuth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Products";
// import { GET } from '../collections/route';
import { Collection } from "mongoose";



export const POST = async (req: NextRequest) => {

    // const { getToken } = useAuth();

    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401});
        }

        await connectToDB()

        const { title, description, media, category, collections, tags, sizes, colors, price, expense} = await req.json();

        if (!title || !description || !media || !category || !price || !expense) {
            return new NextResponse("Not enough data to create a product", {status: 400});
        }

        // console.log(auth())

        const newProduct = await Product.create({
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
        });

        await newProduct.save();

        
        // const token = await getToken({ template: "your_template_name" });
    
        // fetch("/api/products", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Authorization": `Bearer ${token}`,
        //     },
        //     body: JSON.stringify(newProduct),
        //   });

        return NextResponse.json(newProduct, {status: 200});

    } catch (error) {
        console.log("[products_POST]", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const products = await Product.find()
        .sort({ createdAt: "desc"})
        .populate({path: "collections", model: Collection});

        return NextResponse.json(products, { status: 200});
    } catch (error) {
        console.log("[products_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}