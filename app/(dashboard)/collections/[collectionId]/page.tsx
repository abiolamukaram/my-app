// "use client"

// import CollectionForm from "@/components/collections/CollectionForm"
// import Loader from "@/components/custom ui/Loader"
// import { useEffect, useState } from "react"



// const CollectionDetails = ({params} : {params: {CollectionId: string}}) => {
//     const [loading, setLoading] = useState(true)
//     const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     const getCollectionDetails = async () => {
//         try {
//             const res = await fetch(`/api/collections/${params.CollectionId}`,{
//                 method: "GET"
//             })
            
//             const data = await res.json()
//             setCollectionDetails(data)
//             setLoading(false)
//         } catch (error) {
//             console.log("[collectionId_GET]", error)
//         }
//     }

//     useEffect(() => {
//         getCollectionDetails()
//     }, [getCollectionDetails])

//     return loading ? <Loader/> : (
//     <div>
//       <CollectionForm initialData={collectionDetails} />
//     </div>
//   )

// }
// export default CollectionDetails


"use client";

import { useEffect, useState } from "react";
import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";

type CollectionType = {
    // Define the structure of your collection here
    id: string;
    name: string;
    description?: string;
    [key: string]: any;
};

const CollectionDetails = ({ params }: { params: { CollectionId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null);
    const [error, setError] = useState<string | null>(null); // Optional: Track errors

    useEffect(() => {
        const getCollectionDetails = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/collections/${params.CollectionId}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch data: ${res.statusText}`);
                }

                const data = await res.json();
                setCollectionDetails(data);
            } catch (error) {
                console.error("[collectionId_GET]", error);
                setError("Failed to load collection details."); // Optional: Handle errors gracefully
            } finally {
                setLoading(false);
            }
        };

        getCollectionDetails();
    }, [params.CollectionId]); // Use params.CollectionId as the dependency

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>; // Optional: Display an error message if something goes wrong

    return (
        <div>
            <CollectionForm initialData={collectionDetails} />
        </div>
    );
};

export default CollectionDetails;

