"use client";
import React from "react";
import { Input } from "./ui/input";
import Profilebutton from "./Profilebutton";
import { Button } from "./ui/button";
import { Mail, Search } from "lucide-react";
import { ModeToggle } from "./Theme-toggle";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Signinbutton from "./Signinbutton";

export default function TopNav({ setSearchQuery }: any) {
  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value); // Update the search query state
  };
  return (
    <nav className="">
      <div className=" flex justify-between items-center gap-2 p-2">
        <div className="left ">
          <Link href={"/home"}>N.</Link>
        </div>
        <div className="mid flex-grow  flex items-center">
          {/* <Search
            className="mr-2 h-[1.2rem] w-[1.2rem]"
            // color="var(--background)"
            // className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          /> */}
          <Input
            onChange={handleSearchChange}
            className="h-10 "
            type="search"
            placeholder="Search"
          />
        </div>
        <div className="right flex flex-row gap-2 items-center">
          <div className="flex gap-2 items-center">
            <ModeToggle />
            {/* <Profilebutton
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              fallbackInitials="CN"
            /> */}
            <div className="sm:flex flex-row">
              {/* <Button className="btn" onClick={signIn}>
                Sign In
              </Button> */}
              <Signinbutton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
