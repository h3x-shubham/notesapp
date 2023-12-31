"use client";
import React, { useEffect, useState } from "react";
import TopNav from "./Top-nav";
import AddNoteDialog from "./AddNoteDialog";
import ProductTray from "./ProductTray";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "./ui/label";
export default function HomeMain({ data }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(!!searchQuery);
  }, [searchQuery]);

  const d = data?.NoteItems;
  const sortednoteitems =
    data && data.NoteItems // Create a copy of the array to avoid mutating the original data
      ? [...data.NoteItems].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : [];
  const filteredNotes = sortednoteitems?.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-grow  h-screen p-5">
      <div className="w-full flex flex-row ">
        <div className="flex-grow  h-auto">
          <TopNav setSearchQuery={setSearchQuery} />
        </div>
      </div>
      <div className="p-5   text-center">
       
        <AddNoteDialog />
      </div>
      <div className="">
        <div>
          {searchQuery && filteredNotes.length === 0 ? (
            <Alert className="columns-1 mx-5 w-auto justify-center items-center">
              <AlertTitle className="text-center">Nothing found</AlertTitle>
            </Alert>
          ) : (
            <div className="flex flex-col w-auto">
              <Label className="pl-5">Pinned</Label>
              <ProductTray
                notes={searchQuery ? filteredNotes : d}
                className="p-5 rounded-3xl"
                pinned={true}
              />
            </div>
          )}
        </div>
        <div className="">
          {searchQuery && filteredNotes.length === 0 ? (
            <Alert className="columns-1 mx-5 w-auto justify-center items-center">
              <AlertTitle className="text-center">Nothing found</AlertTitle>
            </Alert>
          ) : (
            <div className="flex flex-col w-auto">
              <Label className="pl-5">others</Label>
              <ProductTray
                notes={searchQuery ? filteredNotes : d}
                className="p-5 rounded-3xl"
                pinned={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
