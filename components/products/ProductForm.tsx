"use client"

import { z } from "zod"
import { Separator } from "../ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import ImageUpload from "../custom ui/ImageUpload"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Delete from "../custom ui/Delete"
import { ProductType } from "@/lib/types"


const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1)
});

interface ProductFormProps {
initialData?: ProductType | null; //Must have "?" to make it optional
}

const ProductForm: React.FC<ProductFormProps> = ({initialData}) => {
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] =useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? initialData : {
      title: "",
      description: "",
      image: "",
    },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData ? `/api/collections/${initialData._id}` : "/api/collections"
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values)
      })
      if (res.ok) {
        setLoading(false);
        toast.success(`Collection ${initialData? "updated" : "created"}`);
        // To refresh the collections page
        window.location.href = "/collections";
        router.push("/collections");
      }
    } catch (error) {
      console.log("[collection_POST", error)
      toast.error("Something went wrong! Please try again.")
    }
  };
  
  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between
        ">
          <p className="text-heading2-bold">Edit Collection</p>
          <Delete id={initialData._id} />
        </div>
        ) : (<p className="text-heading2-bold">Create Collection</p>)}
      
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} onKeyDown={handleKeyPress} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} rows={5} onKeyDown={handleKeyPress} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>image</FormLabel>
              <FormControl>
                <ImageUpload value={field.value ? [field.value] :[]} onChange={(url) => field.onChange(url)} onRemove={() => field.onChange("")}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-10">
        <Button type="submit" className="bg-blue-1 text-white">Submit</Button>
        <Button type="button" onClick={() => router.push("/collections") } className="bg-blue-1 text-white">Discard</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default ProductForm
