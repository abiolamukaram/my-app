"use client"

import CollectionForm from "@/components/collections/CollectionForm"
import Loader from "@/components/custom ui/Loader"
import { useEffect, useState } from "react"



const CollectionDetails = ({params} : {params: {CollectionId: string}}) => {
    const [loading, setLoading] = useState(true)
    const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

    const getCollectionDetails = async () => {
        try {
            const res = await fetch(`/api/collections/${params.CollectionId}`,{
                method: "GET"
            })
            
            const data = await res.json()
            setCollectionDetails(data)
            setLoading(false)
        } catch (error) {
            console.log("[collectionId_GET]", error)
        }
    }

    useEffect(() => {
        getCollectionDetails()
    }, [])

  return loading ? <Loader/> : (
    <div>
      <CollectionForm initialData={collectionDetails} />
    </div>
  )

}
export default CollectionDetails
