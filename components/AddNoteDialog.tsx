"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { Textarea } from "./ui/textarea";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { revalidatePath } from "next/cache";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export default function AddNoteDialog() {
      const router = useRouter();

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
          title: "",
          content: "",
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
     const apiEndpoint = "/api/notes/addnote";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      // console.log("Success:", response);
      if (response.ok) {
        setOpen(false);
        form.reset({
          title: "",
          content: "",
        });
         toast("Note added successfully");
        router.refresh()
      }
      // Handle success
    } catch (error) {
      // console.error("Error:", error);
       toast("Unable to add note", {
         description: JSON.stringify(error),
       });
      // Handle error
    }

    // console.log(values);
  }

  return (

    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FilePlusIcon className="mr-2 h-full w-full" />
          Take a note...
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>content</FormLabel>
                  <FormControl>
                    <Textarea
                      className="col-span-3 h-auto resize-none"
                      placeholder="Take a note..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {/* <DialogClose> */}
              <Button type="submit">Save changes</Button>
              {/* </DialogClose> */}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
