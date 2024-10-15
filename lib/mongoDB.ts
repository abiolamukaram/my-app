import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("MongoDB ia already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName: "Nuskiddies_Admin"
        })

        isConnected = true;
        console.log("MongoDB is Connected");
    } catch (error) {
        console.log(error)
    }
}
