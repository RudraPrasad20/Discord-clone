"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import qs from "query-string";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FileUpload } from "@/components/file-upload";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";
import { channelType } from "@prisma/client";
import { Quicksand } from "next/font/google";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "name required" })
    .refine((name) => name !== "general", {
      message: "channel name cant be general",
    }),
  type: z.nativeEnum(channelType),
});

export const CreateChannelModel = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "createChannel";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channelType.TEXT,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params?.serverId,
        },
      });

      await axios.post(url, values);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" bg-white overflow-hidden text-black">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className=" text-center font-semibold">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold dark:text-secondary/70 text-zinc-500">
                      Channel NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className=" bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Your Channel Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className=" bg-zinc-300/50 border-0
focus:ring-0 text-black ring-offset-0
focus:ring-offset-0 capitalize
outline-none"
                        >
                          <SelectValue placeholder=" Select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(channelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className=" capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
  );
};
