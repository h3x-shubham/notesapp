"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DrawingPinFilledIcon,
  DrawingPinIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import UpdateNoteDialog from "./UpdateNoteDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function ProductTrayItem({ details }: any) {
  const router = useRouter();
  // console.log(details)
  // const deteid=details.id
  const title = details.title;
  const content = details.content;

  async function onDeleteNote() {
    const apiEndpoint = `/api/notes/deletenote/${details?.id}`; // Extracting id here

    try {
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "": "" }),
      });

      const data = await response.json();
      // console.log("Success:", data);
      if (response.ok) {
        toast("Note Delted");
        router.refresh();
      }
      // Handle success
    } catch (error) {
      // console.error("Error:", error);
      toast("Unable to delete", {
        description: JSON.stringify(error),
      });
      // Handle error
    }

    // console.log(values);
  }
  async function onPinnedNote() {
    const newPinnedStatus = !details.pinned;
    const apiEndpoint = `/api/notes/updatenote/${details?.id}`; // Extracting id here
    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...details, pinned: newPinnedStatus }),
      });
      if (response.ok) {
        {
          !newPinnedStatus
            ? toast("Note unpinned successfully")
            : toast("Note pinned successfully");
        }
        router.refresh(); // Refresh to show updated status
      }
    } catch (error) {
      !newPinnedStatus
        ? toast("Unable to unpinned ")
        : toast("Unlable to pinned ");
    }
  }

  return (
    <Card className="w-full sm:max-w-[298px] h-auto">
      <CardHeader className="">
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent className="break-words">{content}</CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button
          variant={"outline"}
          size={"icon"}
          className="h-8 w-auto p-1"
          onClick={onPinnedNote}
        >
          {details?.pinned ? (
            <DrawingPinFilledIcon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <DrawingPinIcon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>

        {/* <Button
          variant={"outline"}
          size={"icon"}
          className="h-8 w-auto p-1"
          onClick={onEditNote}
        >
          <Pencil2Icon className="h-[1.2rem] w-[1.2rem]" />
        </Button> */}
        <UpdateNoteDialog existingNote={details} />
        <Button
          variant={"destructive"}
          size={"icon"}
          className="h-8 w-auto p-1"
          onClick={onDeleteNote}
        >
          <TrashIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </CardFooter>
    </Card>
  );
}
