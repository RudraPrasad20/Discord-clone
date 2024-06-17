"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileUpload } from "../file-upload";


  const formSchema = z.object({
    name: z.string().min(1, {message: "name required"}),
    imageUrl: z.string().min(1, {message: "image required"}),
  })

export const InitialModel = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(()=> {
        setMounted(true)
    }, [])
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            imageUrl: "",
        }
    })

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
      try {
        await axios.post("/api/servers", values)
        form.reset()
        router.refresh()
       
      } catch (error) {
        console.log(error)
      }
    }
const handleClose = () => {
  form.reset()
 
}
if(!mounted){
    return null
}
return (
<Dialog open onOpenChange={handleClose}>
  <DialogContent className=" bg-white overflow-hidden text-black">
    <DialogHeader className="pt-8 px-6">
      <DialogTitle className=" text-center font-semibold">Create Your Server</DialogTitle>
      <DialogDescription className="text-center ■text-zinc-500">
      Give your server a personality with a name and an image.
You can always change it later.
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <div className="space-y-8 px-6">
<div className="flex items-center justify-center text-center">

{/* make this formcontrol after creating the middleware of uploadthing & after creating the fileupload file in the components folder */}
<FormField 
    control={form.control}
    name="imageUrl"
    render={({ field }) => (
      <FormItem>
          <FormControl>
            <FileUpload
            endpoint="serverImage"
            value={field.value}
            onChange={field.onChange}

            />
          </FormControl>
      </FormItem>
    )}
/>
    
    </div>
    <FormField 
    control={form.control}
    name="name"
    render={({ field }) => (
        <FormItem>
          <FormLabel className="uppercase text-xs font-bold dark:text-secondary/70 text-zinc-500">SERVER NAME</FormLabel>
          <FormControl>
            <Input disabled={isLoading}
            className=" bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
            placeholder="Enter Your Server Name" {...field} />
          </FormControl>
          <FormMessage />
          
        </FormItem>
      )}
    />
</div>
<DialogFooter className=" bg-gray-100 px-6 py-4">
    <Button disabled={isLoading}>Create</Button>
</DialogFooter>
    </form>
    </Form>
  </DialogContent>
</Dialog>

)
}