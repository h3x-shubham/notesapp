"use client";
import React from "react";
import TrayItem from "./TrayItem";
import { ClassNameValue } from "tailwind-merge";
import ProductTrayItem from "./ProductTrayItem";

function ProductTray({ className, notes, pinned }: any) {
  const data = notes;
  const pinnedNotes = notes?.filter((note: any) => note.pinned);
  const unpinnedNotes = notes?.filter((note: any) => !note.pinned);

  // const sortednoteitems =
  //   data && data
  //     ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //     : [];

  const sortNotes = (notesArray: any) =>
    notesArray?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const sortedPinnedNotes = sortNotes(pinnedNotes);
  const sortedUnpinnedNotes = sortNotes(unpinnedNotes);

  return (
    <div
      className={`columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 mb-4 ${className}`}
    >
      {pinned
        ? sortedPinnedNotes?.map((item:any, index:any) => (
            <div
              className="break-inside-avoid mb-4 "
              // transition delay-150 duration-300 ease-in-out"
              key={item.id}
            >
              <ProductTrayItem details={item} />
            </div>
          ))
        : sortedUnpinnedNotes?.map((item:any, index:any) => (
            <div
              className="break-inside-avoid mb-4"
              // transition delay-150 duration-300 ease-in-out"
              key={item.id}
            >
              <ProductTrayItem details={item} />
            </div>
          ))}
    </div>
  );
}

export default ProductTray;
