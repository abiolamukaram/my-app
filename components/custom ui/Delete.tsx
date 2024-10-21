"use client"

import { Trash } from 'lucide-react'
import { Button } from '../ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useState } from 'react'
import toast from 'react-hot-toast'

interface DeleteProps {
  id: string;
}


const Delete: React.FC<DeleteProps> = ({id}) => {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true)
      // const res = await fetch(`/api/collections/${id}`,{
      //   method: "DELETE",
      // })

      const res = await fetch (`/api/collections/${id}`, {
        method: "DELETE",
      })

      if(res.ok) {
        setLoading(false)
        window.location.href = "/collections"
        toast.success("Collection deleted")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong! Please try again.")
    }
  }

  // const onDelete = async () => {
  //   try {
  //     setLoading(true)
  //     const res = await fetch(`/api/collections/${id}`, {
  //       method: "DELETE",
  //     })
  
  //     if (!res.ok) {
  //       const errorData = await res.json()
  //       throw new Error(errorData.message || 'Failed to delete the collection')
  //     }
  
  //     setLoading(false)
  //     window.location.href = "/collections"
  //     toast.success("Collection deleted")
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     console.error('Delete error:', error)
  //     toast.error(error.message || "Something went wrong! Please try again.")
  //     setLoading(false)
  //   }
  // }
  
  return (
    <AlertDialog>
    <AlertDialogTrigger>
    <Button className='bg-red-1 text-white'>
        <Trash className='w-4 h-4' />
    </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className='bg-white text-grey-1'>
      <AlertDialogHeader>
        <AlertDialogTitle className='text-red-1'>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your Collection.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className='bg-red-1 text-white' onClick={onDelete}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
    
  )
}

export default Delete
